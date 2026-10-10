const mongoose = require('mongoose');

const sportsEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  sportCategory: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  coordinator: {
    type: String,
    required: true
  },
  maximumParticipants: {
    type: Number,
    required: true,
    min: [1, 'Maximum participants must be at least 1']
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  }
}, { timestamps: true });

module.exports = mongoose.model('SportsEvent', sportsEventSchema);
