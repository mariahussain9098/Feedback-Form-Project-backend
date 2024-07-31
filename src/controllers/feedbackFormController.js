// const FeedbackForm = require('../models/FeedbackForm');
// const schedule = require('node-schedule');

// // Create a new feedback form
// exports.createFeedbackForm = async (req, res) => {
//   const { title, questions, publishDate } = req.body;

//   try {
//     const feedbackForm = new FeedbackForm({ title, questions });
//     await feedbackForm.save();

//     if (publishDate) {
//       const date = new Date(publishDate);
//       schedule.scheduleJob(date, async () => {
//         feedbackForm.isPublished = true;
//         await feedbackForm.save();
//         console.log(`Feedback form ${feedbackForm._id} published!`);
//       });
//     }

//     res.status(201).json(feedbackForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all feedback forms
// exports.getFeedbackForms = async (req, res) => {
//   const { batch_id, course_id, teacher_id, status } = req.query;
//   let filter = {};

//   if (batch_id) filter.batch_id = batch_id;
//   if (course_id) filter.course_id = course_id;
//   if (teacher_id) filter.teacher_id = teacher_id;
//   if (status) filter.isPublished = status === 'published';

//   try {
//     const feedbackForms = await FeedbackForm.find(filter);
//     res.status(200).json(feedbackForms);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a feedback form by ID
// exports.getFeedbackFormById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const feedbackForm = await FeedbackForm.findById(id);
//     if (!feedbackForm) {
//       return res.status(404).json({ message: 'Feedback form not found' });
//     }
//     res.status(200).json(feedbackForm);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a feedback form
// exports.updateFeedbackForm = async (req, res) => {
//   const { id } = req.params;
//   const { title, questions, publishDate } = req.body;

//   try {
//     const feedbackForm = await FeedbackForm.findByIdAndUpdate(id, { title, questions }, { new: true });
//     if (!feedbackForm) {
//       return res.status(404).json({ message: 'Feedback form not found' });
//     }

//     if (publishDate) {
//       const date = new Date(publishDate);
//       schedule.scheduleJob(date, async () => {
//         feedbackForm.isPublished = true;
//         await feedbackForm.save();
//         console.log(`Feedback form ${feedbackForm._id} published!`);
//       });
//     }

//     res.status(200).json(feedbackForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a feedback form
// exports.deleteFeedbackForm = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const feedbackForm = await FeedbackForm.findByIdAndDelete(id);
//     if (!feedbackForm) {
//       return res.status(404).json({ message: 'Feedback form not found' });
//     }
//     res.status(200).json({ message: 'Feedback form deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Publish feedback form immediately
// exports.publishFeedbackForm = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const feedbackForm = await FeedbackForm.findById(id);
//     if (!feedbackForm) {
//       return res.status(404).json({ message: 'Feedback form not found' });
//     }

//     feedbackForm.isPublished = true;
//     await feedbackForm.save();
//     res.status(200).json({ message: 'Feedback form published' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };









// const FeedbackForm = require('../models/FeedbackForm');
// const schedule = require('node-schedule');

// // Create a new feedback form
// exports.createFeedbackForm = async (req, res) => {
//   const { title, questions, publishDate, batch_id, course_id, teacher_id } = req.body;

//   try {
//     const feedbackForm = new FeedbackForm({ title, questions, publishDate, batch_id, course_id, teacher_id, createdBy: req.user.id });
//     await feedbackForm.save();

//     if (publishDate) {
//       const date = new Date(publishDate);
//       schedule.scheduleJob(date, async () => {
//         feedbackForm.isPublished = true;
//         await feedbackForm.save();
//         console.log(`Feedback form ${feedbackForm._id} published!`);
//       });
//     }

//     res.status(201).json(feedbackForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all feedback forms with filters
// exports.getFeedbackForms = async (req, res) => {
//   const { batch_id, course_id, teacher_id, status } = req.query;
//   let filter = { createdBy: req.user.id }; // Filter by admin who created the form

//   if (batch_id) filter.batch_id = batch_id;
//   if (course_id) filter.course_id = course_id;
//   if (teacher_id) filter.teacher_id = teacher_id;
//   if (status) filter.isPublished = status === 'published';

//   try {
//     const feedbackForms = await FeedbackForm.find(filter);
//     res.status(200).json(feedbackForms);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a feedback form by ID
// exports.getFeedbackFormById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const feedbackForm = await FeedbackForm.findById(id);
//     if (!feedbackForm) {
//       return res.status(404).json({ message: 'Feedback form not found' });
//     }
//     res.status(200).json(feedbackForm);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a feedback form
// exports.updateFeedbackForm = async (req, res) => {
//   const { id } = req.params;
//   const { title, questions, publishDate } = req.body;

//   try {
//     const feedbackForm = await FeedbackForm.findByIdAndUpdate(id, { title, questions, publishDate }, { new: true });
//     if (!feedbackForm) {
//       return res.status(404).json({ message: 'Feedback form not found' });
//     }

//     if (publishDate) {
//       const date = new Date(publishDate);
//       schedule.scheduleJob(date, async () => {
//         feedbackForm.isPublished = true;
//         await feedbackForm.save();
//         console.log(`Feedback form ${feedbackForm._id} published!`);
//       });
//     }

//     res.status(200).json(feedbackForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a feedback form
// exports.deleteFeedbackForm = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const feedbackForm = await FeedbackForm.findByIdAndDelete(id);
//     if (!feedbackForm) {
//       return res.status(404).json({ message: 'Feedback form not found' });
//     }
//     res.status(200).json({ message: 'Feedback form deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Publish feedback form immediately
// exports.publishFeedbackForm = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const feedbackForm = await FeedbackForm.findById(id);
//     if (!feedbackForm) {
//       return res.status(404).json({ message: 'Feedback form not found' });
//     }

//     feedbackForm.isPublished = true;
//     await feedbackForm.save();
//     res.status(200).json({ message: 'Feedback form published' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get feedback form statistics
// exports.getFeedbackFormStats = async (req, res) => {
//   try {
//     const publishedForms = await FeedbackForm.countDocuments({ createdBy: req.user.id, isPublished: true });
//     const pendingForms = await FeedbackForm.countDocuments({ createdBy: req.user.id, isPublished: false });

//     res.status(200).json({ publishedForms, pendingForms });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


















const FeedbackForm = require('../models/FeedbackForm');
const schedule = require('node-schedule');

// Create a new feedback form
exports.createFeedbackForm = async (req, res) => {
  const { title, questions, publishDate, batch_id, course_id, teacher_id } = req.body;

  try {
    const feedbackForm = new FeedbackForm({ title, questions, publishDate, batch_id, course_id, teacher_id, createdBy: req.user.id });
    await feedbackForm.save();

    if (publishDate) {
      const date = new Date(publishDate);
      schedule.scheduleJob(date, async () => {
        feedbackForm.isPublished = true;
        await feedbackForm.save();
        console.log(`Feedback form ${feedbackForm._id} published!`);
      });
    }

    res.status(201).json(feedbackForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all feedback forms with filters
exports.getFeedbackForms = async (req, res) => {
  const { batch_id, course_id, teacher_id, status } = req.query;
  let filter = { createdBy: req.user.id }; // Filter by admin who created the form

  if (batch_id) filter.batch_id = batch_id;
  if (course_id) filter.course_id = course_id;
  if (teacher_id) filter.teacher_id = teacher_id;
  if (status) filter.isPublished = status === 'published';

  try {
    const feedbackForms = await FeedbackForm.find(filter);
    res.status(200).json(feedbackForms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a feedback form by ID
exports.getFeedbackFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const feedbackForm = await FeedbackForm.findById(id);
    if (!feedbackForm) {
      return res.status(404).json({ message: 'Feedback form not found' });
    }
    res.status(200).json(feedbackForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a feedback form
exports.updateFeedbackForm = async (req, res) => {
  const { id } = req.params;
  const { title, questions, publishDate } = req.body;

  try {
    const feedbackForm = await FeedbackForm.findByIdAndUpdate(id, { title, questions, publishDate }, { new: true });
    if (!feedbackForm) {
      return res.status(404).json({ message: 'Feedback form not found' });
    }

    if (publishDate) {
      const date = new Date(publishDate);
      schedule.scheduleJob(date, async () => {
        feedbackForm.isPublished = true;
        await feedbackForm.save();
        console.log(`Feedback form ${feedbackForm._id} published!`);
      });
    }

    res.status(200).json(feedbackForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a feedback form
exports.deleteFeedbackForm = async (req, res) => {
  const { id } = req.params;

  try {
    const feedbackForm = await FeedbackForm.findByIdAndDelete(id);
    if (!feedbackForm) {
      return res.status(404).json({ message: 'Feedback form not found' });
    }
    res.status(200).json({ message: 'Feedback form deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Publish feedback form immediately
exports.publishFeedbackForm = async (req, res) => {
  const { id } = req.params;

  try {
    const feedbackForm = await FeedbackForm.findById(id);
    if (!feedbackForm) {
      return res.status(404).json({ message: 'Feedback form not found' });
    }

    feedbackForm.isPublished = true;
    await feedbackForm.save();
    res.status(200).json({ message: 'Feedback form published' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback form statistics
exports.getFeedbackFormStats = async (req, res) => {
  try {
    const publishedForms = await FeedbackForm.countDocuments({ createdBy: req.user.id, isPublished: true });
    const pendingForms = await FeedbackForm.countDocuments({ createdBy: req.user.id, isPublished: false });

    res.status(200).json({ publishedForms, pendingForms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
