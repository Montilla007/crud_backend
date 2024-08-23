const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();

// Routers
const studentRoute = require('./route/studentRoute')

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/v1/student', studentRoute)

// app.use('/', (req, res) => {
//     res.send("Hello my name is Christer Dale Reyes, the backend developer in Code of Duty aka the person who make miracles behind the curtain.");
//   });

app.get('/', (req, res) => {
    res.redirect('/api/v1/student');
  });

// Connect DB
mongoose.connect(process.env.MONGO_URI)
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
})

module.exports = app;
