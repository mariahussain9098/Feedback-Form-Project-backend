const express = require('express');
const {
  createStudent,
  getStudentDetails,
  updateStudentDetails,
  deleteStudent,
  updateStudentPassword 
} = require('../controllers/studentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to create a new student
router.post('/', createStudent); // No need for 'protect' middleware for registration

// Route to get the details of the authenticated student
router.get('/me', protect, getStudentDetails);

// Route to update the details of the authenticated student
router.put('/me', protect, updateStudentDetails); // Use 'protect' middleware for authorization

// Route to delete the authenticated student
router.delete('/me', protect, deleteStudent); // Use 'protect' middleware for 

router.put('/me/password', protect, updateStudentPassword);

module.exports = router;


