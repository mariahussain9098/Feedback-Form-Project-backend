const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const Teacher = require('../models/Teacher');

// Protected route to create a teacher
router.post('/', protect, authorize('admin'), async (req, res) => {
  const { name, email, batch, course } = req.body;

  try {
    const teacher = new Teacher({ name, email, batch, course }); // Ensure the 'course' field is correctly passed
    await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route to update a teacher
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  const { name, email, batch, course } = req.body;

  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.batch = batch || teacher.batch;
    teacher.course = course || teacher.course;

    await teacher.save();
    res.status(200).json({ message: 'Teacher updated successfully', teacher });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route to delete a teacher
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await Teacher.deleteOne({ _id: req.params.id }); // Use deleteOne method
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
