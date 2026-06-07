const express = require('express');
const router = express.Router();

const {
  getBookings,
  createBooking,
} = require('../controllers/bookings.controller');

router.get('/', getBookings);
router.post('/', createBooking);

module.exports = router;