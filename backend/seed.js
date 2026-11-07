require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'password';

const seedAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('Missing MONGO_URI in .env');
      process.exitCode = 1;
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    await User.updateMany(
      { role: 'admin', email: { $ne: ADMIN_EMAIL } },
      { $set: { role: 'student' } }
    );

    await User.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      {
        $set: {
          name: 'Admin',
          password: hashedPassword,
          role: 'admin'
        },
        $setOnInsert: { email: ADMIN_EMAIL }
      },
      { upsert: true, returnDocument: 'after', runValidators: true }
    );

    console.log('Admin account is ready.');
    console.log(`Email: ${ADMIN_EMAIL}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
