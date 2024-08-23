const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');

// Initialize express app
const app = express();

// Connect to MongoDB
const connectDB = require('./connection/connect_db');
const processData = require('./route/data_route');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', processData);

app.get('/', (req, res) => {
    res.send("Hello my name is Christer Dale Reyes, the backend developer in Code of Duty aka the person who makes miracles behind the curtain.");
});

// Export the app as a serverless function
module.exports.handler = serverless(app);
