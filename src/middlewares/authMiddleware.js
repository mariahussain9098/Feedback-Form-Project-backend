const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user is admin or student
      let user = await Admin.findById(decoded.userId).select('-password');
      if (!user) {
        user = await Student.findById(decoded.userId).select('-password');
      }

      if (!user) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log('User role:', req.user.role); // Debug: Check the role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
    }
    next();
  };
};


