// const mongoose = require('mongoose');

// const feedbackSchema = new mongoose.Schema({
//   teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
//   feedbackDetails: { type: String, required: true },
//   batch: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Feedback', feedbackSchema);







// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  ratings: {
    course_structure: { type: Number, min: 1, max: 5 },
    relevance_of_material: { type: Number, min: 1, max: 5 },
    clarity_of_content: { type: Number, min: 1, max: 5 },
    practical_application: { type: Number, min: 1, max: 5 },
    knowledge_of_subject: { type: Number, min: 1, max: 5 },
    teaching_style: { type: Number, min: 1, max: 5 },
    engagement: { type: Number, min: 1, max: 5 },
    responsiveness: { type: Number, min: 1, max: 5 },
    materials_provided: { type: Number, min: 1, max: 5 },
    assignment_relevance: { type: Number, min: 1, max: 5 },
    satisfaction: { type: Number, min: 1, max: 5 },
  },
  improvements: { type: String },
  testimonial: { type: String },
  additional_comments: { type: String },
  completion_date: { type: Date },
  recommend: { type: Boolean },
  consent: { type: Boolean },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
