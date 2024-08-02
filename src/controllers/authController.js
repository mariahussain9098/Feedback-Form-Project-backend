const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

//   const { email, password } = req.body;
//   try {
//     const student = await Student.findOne({ email });
//     if (!student) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt for email:', email);
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
    console.error('Error in loginStudent:', error.message); // Log the error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



module.exports = { loginStudent };
