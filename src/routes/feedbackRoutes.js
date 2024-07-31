// const express = require('express');
// const { submitFeedback, getFeedbacks } = require('../controllers/feedbackController');
// const { protect } = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.post('/', protect, submitFeedback);
// router.get('/', protect, getFeedbacks);

// module.exports = router;




const express = require('express');
const { submitFeedback, getFeedbacks, getFeedbackByTeacher, getFeedbackByCourse, getFeedbackByBatch, getFeedbackAnalysis } = require('../controllers/feedbackController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Submit Feedback
router.post('/', protect, submitFeedback);

// Get All Feedbacks
router.get('/', protect, getFeedbacks);

// Get Feedback by Teacher
router.get('/teacher/:teacher_id', protect, getFeedbackByTeacher);

// Get Feedback by Course
router.get('/course/:course_id', protect, getFeedbackByCourse);

// Get Feedback by Batch
router.get('/batch/:batch_id', protect, getFeedbackByBatch);

// Get Feedback Analysis
router.get('/analysis', protect, getFeedbackAnalysis);

module.exports = router;



