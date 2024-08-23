const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');

// Initialize express app
const app = express();
const port = process.env.PORT || 5001;  // Use environment variable for port

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

// Start server for local development (not needed for serverless environments)
if (process.env.NODE_ENV !== 'production') {
  const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.error(error);
    }
  };
  start();
}

// Export the app for serverless deployment
module.exports.handler = serverless(app);
