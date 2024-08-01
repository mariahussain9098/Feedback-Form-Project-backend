const FollowUpSurvey = require('../models/FollowUpSurvey');

// Create a follow-up survey
exports.createFollowUpSurvey = async (req, res) => {
  const { feedbackFormId, questions } = req.body;

  try {
    const survey = new FollowUpSurvey({ feedbackFormId, questions });
    await survey.save();
    res.status(201).json(survey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
