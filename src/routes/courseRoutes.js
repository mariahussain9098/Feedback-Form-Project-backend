const express = require('express');
const router = express.Router();
const { getCourses } = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getCourses);

module.exports = router;
