const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.route('/')
  .get(getEvents)
  .post(authMiddleware, roleMiddleware(['admin']), createEvent);

router.route('/:id')
  .get(getEventById)
  .put(authMiddleware, roleMiddleware(['admin']), updateEvent)
  .delete(authMiddleware, roleMiddleware(['admin']), deleteEvent);

module.exports = router;
