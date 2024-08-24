const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


dotenv.config({ path: './config.env' });

// Initialize express app
const app = express();

// Routers
const studentRoute = require('./route/studentRoute')

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/v1/student', studentRoute)

app.use('/', (req, res) => {
    res.send("Hello my name is Christer Dale Reyes, the backend developer in Code of Duty aka the person who make miracles behind the curtain.");
  });

// app.get('/', (req, res) => {
//     res.redirect('/api/v1/student');
//   });

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connection successful!'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

module.exports = app;
