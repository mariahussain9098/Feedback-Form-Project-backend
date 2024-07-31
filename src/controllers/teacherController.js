const Teacher = require('../models/Teacher');

// Add a new teacher
exports.addTeacher = async (req, res) => {
  const { name, email } = req.body;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if teacher already exists
  const teacherExists = await Teacher.findOne({ email });
  if (teacherExists) {
    return res.status(400).json({ message: 'Teacher already exists' });
  }

  try {
    const teacher = await Teacher.create({ name, email });
    res.status(201).json({
      _id: teacher.id,
      name: teacher.name,
      email: teacher.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a teacher
exports.updateTeacher = async (req, res) => {
  const { id, name, email } = req.body;

  // Validate input
  if (!id || !name || !email) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const teacher = await Teacher.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher updated successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
  const { id } = req.body;

  // Validate input
  if (!id) {
    return res.status(400).json({ message: 'Please provide the teacher ID' });
  }

  try {
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
