const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SportsEvent',
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  participationStatus: {
    type: String,
    enum: ['Registered', 'Approved', 'Rejected', 'Completed'],
    default: 'Registered'
  },
  result: {
    type: String,
    enum: ['Not Declared', 'Winner', 'Runner-up', 'Participant'],
    default: 'Not Declared'
  }
}, { timestamps: true });

// Prevent duplicate registrations
registrationSchema.index({ student: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
