const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config()

// Global Variables
const port = process.env.DEV_PORT;

// Models
const User = require('./models/User')
const Project = require('./models/Project');
const cookieParser = require('cookie-parser');

// Database setup
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {dbName: 'it-steering-app'}).then(()=>console.log("Connected to the database"));

// Main Setup
const app = express();
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.listen(port, ()=>{
    console.log(`IT Steering API Server listening on ${port}`);
});

app.get('/', (req, res)=>{
    res.send('You can access the IT Steering API, and it works');
});

// Functions
const generateJWT = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 259200
    });
}

const checkJWT = req => {
    const token = req.cookies.jwt;
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) 
                    resolve(false);
                else
                    resolve(true);
            });
        } else {
            resolve(false);
        }
    });
}

// Api Calls

// Check if user is logged in
app.get('/user', async (req, res)=>{
    try{
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (!err){
                    const user = await User.findById(decodedToken.id);
                    res.status(200).json(user);
                }  
            });
        } 
    } catch(err){
        console.error(err)
    }
    
});

// Get all of user's projects
app.get('/user/projects/:userId', async (req, res)=>{
    try{
        if(await checkJWT(req)){
            const user = await User.findById(req.params.userId).populate('projects');
            res.json(user.projects);
        }
        res.status(401).json({ message: 'You are not logged in'});
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occurred while fetching user projects');
    }
});

// Get all projects
app.get('/projects', async (req, res)=>{
    try{
        if(await checkJWT(req))
            res.send(await Project.find());
        else
            res.status(401).json({ message: 'You are not logged in'});
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occurred while fetching all projects');
    }
});

// Create a project and add it to user's array of projects
app.post('/projects/:userId', async (req, res)=>{
    try{
        if(await checkJWT(req)){
            const newProject = await Project.create(req.body);
            const user = await User.findById(req.params.userId).populate('projects');
            user.projects.push(newProject);
            await user.save()
            res.status(200).json({ message: 'A project has been created' });
        } else
            res.status(401).json({ message: 'You are not logged in'});
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occurred while creating a project');
    }
});

// Delete a project
app.delete('/projects/:projectId', async (req, res)=>{
    try{
        if(await checkJWT(req)){
            await Project.deleteOne({ _id: req.params.projectId });
            res.status(200).send('Project deleted');
        }
        res.status(401).json({ message: 'You are not logged in'});
    } catch(err){
        console.error(err);
        res.status(500).send('An error occurred while deleting a project');
    }
});

// Update a project
app.put('/projects', async (req, res)=>{
    try{
        if(await checkJWT(req)){
            project = await Project.findOne({ _id: req.body._id });
            project.set(req.body);
            await project.save();
            res.status(200).send('Project updated');
        } else
            res.status(401).json({ message: 'You are not logged in'});
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occurred while updating the project');
    }
});

// Create a user account
app.post('/signup', async (req, res)=>{
    try{
        const user = await User.create({username: req.body.username, password: req.body.password, admin: false, projects: []});
        const token = generateJWT(user._id);
        res.cookie('jwt', token, { maxAge: 259200000});
        res.status(200).json({ user: user._id });
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occured while trying to sign you up');
    }
});

// Login with a user account
app.post('/login', async (req, res)=>{
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateJWT(user._id);
        res.cookie('jwt', token, { maxAge: 259200000 });
        res.status(200).json({ message: 'You have been logged in', user: user._id });
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'An error has occured while trying to log you in' });
    }
});

// Logout 
app.get('/logout', (req, res)=>{
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out'});
});