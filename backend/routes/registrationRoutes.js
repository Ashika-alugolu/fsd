const express = require('express');
const router = express.Router();
const { 
  registerForEvent, 
  getMyRegistrations, 
  cancelRegistration,
  getAllRegistrations,
  getRegistrationsByEvent,
  updateRegistration
} = require('../controllers/registrationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Student routes
router.post('/', authMiddleware, roleMiddleware(['student']), registerForEvent);
router.get('/my-events', authMiddleware, roleMiddleware(['student']), getMyRegistrations);
router.delete('/:id', authMiddleware, roleMiddleware(['student']), cancelRegistration);

// Admin routes
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllRegistrations);
router.get('/event/:eventId', authMiddleware, roleMiddleware(['admin']), getRegistrationsByEvent);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateRegistration);

module.exports = router;
