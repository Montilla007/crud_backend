const Student = require('../model/Student');

const getData = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createData = async (req, res) => {
    const { firstName, lastName, course, year, enrolled } = req.body;

    try {
        const newStudent = new Student({ firstName, lastName, course, year, enrolled });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateData = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, course, year, enrolled } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { firstName, lastName, course, year, enrolled },
            { new: true, runValidators: true }  // `new: true` to return the updated document, `runValidators: true` to apply schema validations
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted', student: deletedStudent });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getData, createData, updateData, deleteData };
