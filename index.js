const express = require('express');
require('dotenv').config();
const dbConnect = require('./src/config/dbConnect');
const authRoutes = require('./src/routes/authRoutes');
const feedbackRoutes = require('./src/routes/feedbackRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const feedbackFormRoutes = require('./src/routes/feedbackFormRoutes');



const app = express();

app.use(express.json());
dbConnect();

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedbackForm', feedbackFormRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
