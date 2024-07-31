const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  // other batch-related fields
});

module.exports = mongoose.model('Batch', batchSchema);
