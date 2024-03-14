const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// Global Variables
const port = process.env.DEV_PORT;

// Models
const User = require('./models/User')
const Project = require('./models/Project')

// Database setup
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {dbName: 'it-steering-app'}).then(()=>console.log("Connected to the database"));

// Main Setup
const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, ()=>{
    console.log(`IT Steering API Server listening on ${port}`);
});

app.get('/', (req, res)=>{
    res.send('You can access the IT Steering API, and it works');
});

// Api Calls
// Dela
app.get('/projects', async (req, res)=>{
    try{
        res.send(await Project.find());
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occurred while fetching all projects');
    }
});

//Dela
app.get('/user/projects/:userId', async (req, res)=>{
    try{
        const user = await User.findById(req.params.userId).populate('projects');
        res.json(user.projects);
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occurred while fetching user projects');
    }
});

// Dela
app.post('/projects', async (req, res)=>{
    try{
        await Project.create(req.body);
        res.status(200).send('A project has been created');
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occurred while creating a project');
    }
});

// Dela
app.delete('/projects/:projectId', async (req, res)=>{
    try{
        await Project.deleteOne({ _id: req.params.projectId });
        res.status(200).send('Project deleted');
    } catch(err){
        console.error(err);
        res.status(500).send('An error occurred while deleting a project');
    }
});

// Dela
app.put('/projects', async (req, res)=>{
    try{
        project = await Project.findOne({ _id: req.body._id });
        project.set(req.body);
        await project.save();
        res.status(200).send('Project updated');
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occurred while updating the project');
    }
});

app.post('/login', async (req, res)=>{
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});
        res.status(200).send('You have been logged in');
    } catch(err){
        console.error(err);
        res.status(500).send('An error has occured while trying to log you in');
    }
});

app.post('/logout', async (req, res)=>{
    res.send('POST log out');
});

/*
1. GET all projects
2. POST new project
3. DELETE project
4. PUT project 
5. POST log in
6. POST Log out
*/