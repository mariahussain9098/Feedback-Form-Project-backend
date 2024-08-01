const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // other course-related fields
});

module.exports = mongoose.model('Course', courseSchema);
