// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middlewares/authMiddleware');
// const {
//   createFeedbackForm,
//   getFeedbackForms,
//   getFeedbackFormById,
//   updateFeedbackForm,
//   deleteFeedbackForm,
//   publishFeedbackForm
// } = require('../controllers/feedbackFormController');

// // Routes with protection middleware
// router.post('/', protect, createFeedbackForm);
// router.get('/', protect, getFeedbackForms);
// router.get('/:id', protect, getFeedbackFormById);
// router.put('/:id', protect, updateFeedbackForm);
// router.delete('/:id', protect, deleteFeedbackForm);
// router.post('/:id/publish', protect, publishFeedbackForm);

// module.exports = router;













const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createFeedbackForm,
  getFeedbackForms,
  getFeedbackFormById,
  updateFeedbackForm,
  deleteFeedbackForm,
  publishFeedbackForm,
  getFeedbackFormStats
} = require('../controllers/feedbackFormController');
const {getFeedbackStatistics} = require('../controllers/feedbackAnalysisController')
const {generateFeedbackReport} = require('../controllers/reportController');
const {createFollowUpSurvey} = require('../controllers/followUpSurveyController');

// Routes with protection middleware
router.post('/', protect, createFeedbackForm);
router.get('/', protect, getFeedbackForms);
router.get('/:id', protect, getFeedbackFormById);
router.put('/:id', protect, updateFeedbackForm);
router.delete('/:id', protect, deleteFeedbackForm);
router.post('/:id/publish', protect, publishFeedbackForm);
router.get('/stats', protect, getFeedbackFormStats); 
router.get('/analysis', protect, getFeedbackStatistics);
router.get('/report', protect, generateFeedbackReport);
router.post('/follow-up', protect, createFollowUpSurvey);




module.exports = router;
