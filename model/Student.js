const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    course: String,
    year: String,
    enrolled: Boolean,
});

module.exports = mongoose.model('Student', studentSchema);