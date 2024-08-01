// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const Admin = require('../src/models/Admin'); // Ensure you have an Admin model
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const addAdmin = async () => {
//   try {
//     const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12); // Hash the password from .env
//     const admin = new Admin({
//       name: process.env.ADMIN_NAME,
//       email: process.env.ADMIN_EMAIL,
//       password: hashedPassword,
//     });

//     await Admin.deleteOne({ email: process.env.ADMIN_EMAIL }); // Remove existing admin if any
//     await admin.save();
//     console.log('Admin added successfully');
//     mongoose.disconnect();
//   } catch (error) {
//     console.error('Error adding admin:', error);
//     mongoose.disconnect();
//   }
// };

// addAdmin();









const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../src/models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12); // Hash the password
    const admin = new Admin({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin added successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error adding admin:', error);
    mongoose.disconnect();
  }
};

addAdmin();
