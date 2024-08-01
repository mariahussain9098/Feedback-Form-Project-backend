// const express = require('express');
// require('dotenv').config();
// const dbConnect = require('./src/config/dbConnect');
// const authRoutes = require('./src/routes/authRoutes');
// const feedbackRoutes = require('./src/routes/feedbackRoutes');
// const studentRoutes = require('./src/routes/studentRoutes');
// const teacherRoutes = require('./src/routes/teacherRoutes');
// const adminRoutes = require('./src/routes/adminRoutes');
// const feedbackFormRoutes = require('./src/routes/feedbackFormRoutes');

// const app = express();

// app.use(express.json());
// dbConnect();

// app.use('/api/auth', authRoutes);
// app.use('/api/feedback', feedbackRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/teachers', teacherRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/feedbackForm', feedbackFormRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });










require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./src/config/dbConnect');
const authRoutes = require('./src/routes/authRoutes');
const feedbackRoutes = require('./src/routes/feedbackRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const feedbackFormRoutes = require('./src/routes/feedbackFormRoutes');

const app = express();

const corsConfig = {
  origin : "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsConfig));
app.use(express.json());

// Database connection
dbConnect()
  .then(() => {
    // Route definitions
    app.use('/api/auth', authRoutes);
    app.use('/api/feedback', feedbackRoutes);
    app.use('/api/students', studentRoutes);
    app.use('/api/teachers', teacherRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/feedbackForm', feedbackFormRoutes);

    // Port configuration
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// // Default route
app.get('/', (req, res) => {
  res.send("Hello and welcome from index page..............!!!!!!!!");
});

module.exports = app;
