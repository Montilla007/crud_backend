const express = require('express');
const router = express.Router();  // Corrected to express.Router()

const { getData, createData, updateData, deleteData } = require('../controller/home');

// Define routes
router.get('/data', getData);
router.post('/data', createData);
router.put('/data/:id', updateData);
router.delete('/data/:id', deleteData);

module.exports = router;  // Fixed typo
