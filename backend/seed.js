require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('Missing MONGO_URI in .env');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminExists = await User.findOne({ email: 'admin@sportsportal.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    await User.create({
      name: 'Admin',
      email: 'admin@sportsportal.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@sportsportal.com');
    console.log('Password: Admin@123');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
