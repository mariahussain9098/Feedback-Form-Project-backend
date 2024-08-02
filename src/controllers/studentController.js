const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

const createStudent = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, studentId, batch, course } = req.body;
  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check for existing email or student ID
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingStudentId = await Student.findOne({ studentId });
    if (existingStudentId) {
      return res.status(400).json({ message: 'Student ID already in use' });
    }

    // Hash the password and create the student
    const hashedPassword = await bcrypt.hash(password, 12);
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      studentId,
      batch,
      course
    });

    // Save the student to the database
    await newStudent.save();

    // Respond with the created student data (excluding the password)
    res.status(201).json({
      message: 'Student registered successfully',
      student: {
        id: newStudent._id,
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        email: newStudent.email,
        studentId: newStudent.studentId,
        batch: newStudent.batch,
        course: newStudent.course
      }
    });
  } catch (error) {
    console.error('Error creating student:', error); // Log the error details
    res.status(400).json({ message: 'Error creating student', error: error.message });
  }
};

// get specific student

const getStudentById = async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters
  try {
    const student = await Student.findById(id).select('-password'); // Exclude the password from the response
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error retrieving student:', error); // Log the error details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update details of the authenticated student
const updateStudentDetails = async (req, res) => {
  const { firstName, lastName, email, batch, course } = req.body; // Get updated data from request body
  try {
    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, batch, course }, // Update only the fields you want
      { new: true, runValidators: true } // Options to return the updated document and validate input
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Error updating student details:', error); // Log the error details
    res.status(500).json({ message: 'Server error' });
  }
};

// Update student password
const updateStudentPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, student.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    student.password = hashedPassword;
    await student.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error); // Log the error details
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete the authenticated student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.user.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error); // Log the error details
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createStudent, getStudentById, updateStudentDetails, updateStudentPassword, deleteStudent };
