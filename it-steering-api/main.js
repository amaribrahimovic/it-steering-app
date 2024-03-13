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