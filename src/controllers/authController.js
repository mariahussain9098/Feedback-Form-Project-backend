const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const registerStudent = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, studentId, batch, course } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingStudentId = await Student.findOne({ studentId });
    if (existingStudentId) {
      return res.status(400).json({ message: 'Student ID already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const student = new Student({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      studentId,
      batch,
      course
    });
    await student.save();

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Student registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerStudent, loginStudent };
