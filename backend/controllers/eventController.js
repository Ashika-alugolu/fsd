const SportsEvent = require('../models/SportsEvent');

exports.getEvents = async (req, res) => {
  try {
    const events = await SportsEvent.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await SportsEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { eventName, sportCategory, eventDate, venue, coordinator, maximumParticipants, description, status } = req.body;

    if (!eventName || !sportCategory || !eventDate || !venue || !coordinator || !maximumParticipants) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (maximumParticipants < 1) {
      return res.status(400).json({ message: 'Maximum participants must be at least 1' });
    }

    const event = await SportsEvent.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await SportsEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (req.body.maximumParticipants !== undefined && req.body.maximumParticipants < 1) {
       return res.status(400).json({ message: 'Maximum participants must be at least 1' });
    }

    const updatedEvent = await SportsEvent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await SportsEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
