const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  batch: { type: [String], required: true },
  course: { type: [String], required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);


