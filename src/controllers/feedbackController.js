// const Feedback = require('../models/Feedback');
// const Student = require('../models/Student');
// const Teacher = require('../models/Teacher');
// const nodemailer = require('nodemailer');

// const submitFeedback = async (req, res) => {
//   const { teacherId, feedbackDetails } = req.body;

//   // Validate input
//   if (!teacherId || !feedbackDetails) {
//     return res.status(400).json({ message: 'Please provide teacher ID and feedback details' });
//   }

//   try {
//     const student = await Student.findById(req.user.id);
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     const feedback = new Feedback({
//       teacher: teacherId,
//       feedbackDetails,
//       batch: student.batch
//     });

//     await feedback.save();
//     res.status(201).json({ message: 'Feedback submitted successfully' });

//     // Send feedback summary to student email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER, // Use environment variable
//         pass: process.env.EMAIL_PASS    // Use environment variable
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: student.email,
//       subject: 'Feedback Summary',
//       text: `Dear ${student.firstName},\n\nThank you for your feedback. Here is a summary of your feedback:\n\n${feedbackDetails}\n\nRegards,\nTeam`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         // Optionally notify the user that the email couldn't be sent
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });

//   } catch (error) {
//     console.error('Error submitting feedback:', error); // Log error for debugging
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getFeedbacks = async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find().populate('teacher', 'name email');
//     res.json(feedbacks);
//   } catch (error) {
//     console.error('Error retrieving feedbacks:', error); // Log error for debugging
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { submitFeedback, getFeedbacks };
































const Feedback = require('../models/Feedback');

// Submit Feedback
const submitFeedback = async (req, res) => {
  const {
    student_id,
    teacher_id,
    course_id,
    batch_id,
    ratings,
    improvements,
    testimonial,
    additional_comments,
    completion_date,
    recommend,
    consent,
  } = req.body;

  try {
    const feedback = new Feedback({
      student_id,
      teacher_id,
      course_id,
      batch_id,
      ratings, // Make sure this is an object with necessary rating fields
      improvements,
      testimonial,
      additional_comments,
      completion_date,
      recommend,
      consent,
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('student_id')
      .populate('teacher_id')
      .populate('course_id')
      .populate('batch_id');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Feedback by Teacher
const getFeedbackByTeacher = async (req, res) => {
  const { teacher_id } = req.params;
  try {
    const feedbacks = await Feedback.find({ teacher_id })
      .populate('student_id')
      .populate('course_id')
      .populate('batch_id');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Feedback by Course
const getFeedbackByCourse = async (req, res) => {
  const { course_id } = req.params;
  try {
    const feedbacks = await Feedback.find({ course_id })
      .populate('student_id')
      .populate('teacher_id')
      .populate('batch_id');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Feedback by Batch
const getFeedbackByBatch = async (req, res) => {
  const { batch_id } = req.params;
  try {
    const feedbacks = await Feedback.find({ batch_id })
      .populate('student_id')
      .populate('teacher_id')
      .populate('course_id');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Feedback Analysis
const getFeedbackAnalysis = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const analysis = {
      overall_satisfaction: 0,
      course_structure_avg: 0,
      relevance_of_material_avg: 0,
      clarity_of_content_avg: 0,
      practical_application_avg: 0,
      knowledge_of_subject_avg: 0,
      teaching_style_avg: 0,
      engagement_avg: 0,
      responsiveness_avg: 0,
      materials_provided_avg: 0,
      assignment_relevance_avg: 0,
      total_feedbacks: feedbacks.length,
    };

    if (feedbacks.length > 0) {
      // Calculate average ratings for each category
      analysis.overall_satisfaction = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.satisfaction, 0) / feedbacks.length;
      analysis.course_structure_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.course_structure, 0) / feedbacks.length;
      analysis.relevance_of_material_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.relevance_of_material, 0) / feedbacks.length;
      analysis.clarity_of_content_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.clarity_of_content, 0) / feedbacks.length;
      analysis.practical_application_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.practical_application, 0) / feedbacks.length;
      analysis.knowledge_of_subject_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.knowledge_of_subject, 0) / feedbacks.length;
      analysis.teaching_style_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.teaching_style, 0) / feedbacks.length;
      analysis.engagement_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.engagement, 0) / feedbacks.length;
      analysis.responsiveness_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.responsiveness, 0) / feedbacks.length;
      analysis.materials_provided_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.materials_provided, 0) / feedbacks.length;
      analysis.assignment_relevance_avg = feedbacks.reduce((acc, feedback) => acc + feedback.ratings.assignment_relevance, 0) / feedbacks.length;
    }

    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitFeedback,
  getFeedbacks,
  getFeedbackByTeacher,
  getFeedbackByCourse,
  getFeedbackByBatch,
  getFeedbackAnalysis,
};
