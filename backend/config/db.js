const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is missing in .env file');
      process.exit(1);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
