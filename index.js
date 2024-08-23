const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const port = 5001;

// Connect to MongoDB
const connectDB = (url) => {
    return mongoose.connect(url)
  }

// Define a schema and model
const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    course: String,
    year: String,
    enrolled: Boolean,
});
const Student = mongoose.model('Student', studentSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

// Fetch all students
app.get('/data', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new student
app.post('/data', async (req, res) => {
    const { firstName, lastName, course, year, enrolled } = req.body;

    try {
        const newStudent = new Student({ firstName, lastName, course, year, enrolled });
        await newStudent.save();
        res.status(201).send(newStudent);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update a student
app.put('/data/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, course, year, enrolled } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, {
            firstName,
            lastName,
            course,
            year,
            enrolled
        }, { new: true });

        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }

        res.send(updatedStudent);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a student
app.delete('/data/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).send('Student not found');
        }

        res.send(deletedStudent);
    } catch (err) {
        res.status(400).send(err.message);
    }
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
