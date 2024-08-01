const express = require('express');
const router = express.Router();
const { getBatchesByCourse } = require('../controllers/batchController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/course/:courseId', protect, getBatchesByCourse);

module.exports = router;
