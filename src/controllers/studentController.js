const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

// Create a new student
const createStudent = async (req, res) => {
  const { firstName, lastName, email, password, studentId, batch, course } = req.body;

  try {
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password,
      studentId,
      batch,
      course
    });

    // Save the student to the database
    await newStudent.save();

    // Respond with the created student data (excluding the password)
    res.status(201).json({
      message: 'Student created successfully',
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
    res.status(400).json({ message: 'Error creating student', error: error.message });
  }
};

// Get details of the authenticated student
const getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password'); // Assuming req.user is set by the protect middleware
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
  }
};

// // Update student password
// const updateStudentPassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   try {
//     const student = await Student.findById(req.user.id);

//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     const isMatch = await bcrypt.compare(currentPassword, student.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Current password is incorrect' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 12);
//     student.password = hashedPassword;
//     await student.save();

//     res.json({ message: 'Password updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Delete the authenticated student
// const deleteStudent = async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.user.id);

//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     res.json({ message: 'Student deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { createStudent, getStudentDetails, updateStudentDetails, updateStudentPassword, deleteStudent };


// Update student password
const updateStudentPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const student = await Student.findById(req.user.id); // Ensure req.user.id contains the logged-in student's ID

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password before saving
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    student.password = hashedNewPassword;
    await student.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a student account
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createStudent,
  getStudentDetails,
  updateStudentDetails,
  updateStudentPassword,
  deleteStudent,
};