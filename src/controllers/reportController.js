const FeedbackForm = require('../models/FeedbackForm');
const { Parser } = require('json2csv');

// Generate CSV report
exports.generateFeedbackReport = async (req, res) => {
  try {
    const feedbackForms = await FeedbackForm.find();
    const csvParser = new Parser();
    const csv = csvParser.parse(feedbackForms);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('feedback_report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
