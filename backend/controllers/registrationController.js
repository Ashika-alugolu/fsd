const Registration = require('../models/Registration');
const SportsEvent = require('../models/SportsEvent');

// Student: Register for an event
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    const event = await SportsEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check capacity
    const currentRegistrationsCount = await Registration.countDocuments({ event: eventId });
    if (currentRegistrationsCount >= event.maximumParticipants) {
      return res.status(400).json({ message: 'Event has reached maximum capacity' });
    }

    // Check duplicate
    const existingRegistration = await Registration.findOne({ student: req.user._id, event: eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    const registration = await Registration.create({
      student: req.user._id,
      event: eventId
    });

    res.status(201).json(registration);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Student: Get my events
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user._id })
      .populate('event')
      .sort({ registrationDate: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student: Cancel registration
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({ _id: req.params.id, student: req.user._id });
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    await registration.deleteOne();
    res.json({ message: 'Registration cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('student', 'name email')
      .populate('event', 'eventName sportCategory')
      .sort({ registrationDate: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get registrations by event
exports.getRegistrationsByEvent = async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.eventId })
      .populate('student', 'name email')
      .sort({ registrationDate: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update registration status or result
exports.updateRegistration = async (req, res) => {
  try {
    const { participationStatus, result } = req.body;
    
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (participationStatus) registration.participationStatus = participationStatus;
    if (result) registration.result = result;

    await registration.save();
    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
