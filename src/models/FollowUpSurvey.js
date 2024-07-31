const mongoose = require('mongoose');

const followUpSurveySchema = new mongoose.Schema({
  feedbackFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackForm' },
  questions: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FollowUpSurvey', followUpSurveySchema);
