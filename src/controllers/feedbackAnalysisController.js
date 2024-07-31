const FeedbackForm = require('../models/FeedbackForm');

// Calculate average ratings for feedback forms
exports.getFeedbackStatistics = async (req, res) => {
  try {
    const feedbackForms = await FeedbackForm.find();
    
    const totalRatings = feedbackForms.reduce((acc, form) => {
      return acc + (form.rating || 0); // Assuming rating is a property of FeedbackForm
    }, 0);
    
    const averageRating = feedbackForms.length ? (totalRatings / feedbackForms.length).toFixed(2) : 0;

    res.status(200).json({ averageRating, totalForms: feedbackForms.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
