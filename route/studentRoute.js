const express = require('express');
const router = express.Router();  // Corrected to express.Router()

const studentController = require('../controller/studentController');

// Define routes
router
    .route('/')
    .get(studentController.getStudent)
    .post(studentController.createStudent);

router
    .route('/:id')
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent);
    
module.exports = router;  // Fixed typo
