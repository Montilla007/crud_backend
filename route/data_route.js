const express = require('express');
const router = express.Router();  // Corrected to express.Router()

const { getData, createData, updateData, deleteData } = require('../controller/home');

// Define routes
router.get('/', getData);
router.post('/', createData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;  // Fixed typo
