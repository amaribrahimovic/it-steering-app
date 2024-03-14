const app = require('express')()
const cors = require('cors')
require('dotenv').config()

// Global Variables
const port = process.env.API_LISTEN_PORT;

// Main Setup
app.use(cors());

app.listen(port, ()=>{
    console.log(`IT Steering API Server listening on ${port}`);
});

app.get('/', (req, res)=>{
    res.send('You can access the IT Steering API, and it works');
});

app.get('/projects', (req, res)=>{
    res.send('GET all projects');
});

app.post('/projects', (req, res)=>{
    res.send('POST new project');
});

app.delete('/projects/:projectId', (req, res)=>{
    res.send('DELETE project');
});

app.put('/projects/:projectId', (req, res)=>{
    res.send('PUT project');
});

app.post('/login', (req, res)=>{
    res.send('POST log in');
});

app.post('/logout', (req, res)=>{
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