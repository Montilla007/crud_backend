const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const port = 5001;

// Connect to MongoDB
const connectDB = require('./connection/connect_db')

// Routers
const processData = require('./route/data_route')

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', processData)

app.use('/', (req, res) => {
    res.send("Hello my name is Christer Dale Reyes, the backend developer in Code of Duty aka the person who make miracles behind the curtain.");
  });

// Start server
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  start();
