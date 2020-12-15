const dotenv = require('dotenv');
dotenv.config();

const geonamesUser = process.env.geonamesUser;
const weatherbitKey = process.env.weatherbitKey;
const pixabayKey = process.env.pixabayKey;

var path = require('path');
const fetch = require('node-fetch');

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();
module.exports = app;
// hostname and port
const _HOSTNAME = 'http://localhost';
const _PORT = process.env.PORT || 8080;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware for different bodyParser for incoming data 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));
// Setup Server
const server = app.listen(_PORT, listening(_PORT,_HOSTNAME));

function listening(_PORT,_HOSTNAME) {
    console.log('Server Started . . .');
    console.log(`Listening on port:${_PORT} (${_HOSTNAME}:${_PORT})\n`);
    }

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
    

});

app.get('/get-data',  function (req, res) {
    console.log(':::keys sent to client:::');
    
    const keys = {
        geonamesUser,
        weatherbitKey,
        pixabayKey

    }
         res.send(keys);

});
var userData = {}
app.post('/post-data',  function (req, res) {
    console.log(':::form data submitted:::');
    userData = req.body;
     console.log(userData);
});

