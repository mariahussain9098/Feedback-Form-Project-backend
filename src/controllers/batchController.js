const Batch = require('../models/Batch');

// Get batches by course ID
exports.getBatchesByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const batches = await Batch.find({ course: courseId }).populate('teacher');
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
