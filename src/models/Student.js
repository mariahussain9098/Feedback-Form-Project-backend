const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  password: { type: String, required: true },
  studentId: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^(SMIT|smit)\d{3,4}$/, 
    validate: {
      validator: function(value) {
        const num = parseInt(value.slice(4));
        return num >= 101 && num <= 10000;
      },
      message: props => `${props.value} is not a valid student ID! It should start with SMIT or smit followed by a number between 101 and 10000.`
    }
  },
  batch: { type: String, required: true },
  course: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
