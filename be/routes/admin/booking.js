var express = require('express');
var router = express.Router();

const bookingBuilder = require('../../app/controllers/cms/Booking.controller');
const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.get('/booking/',isAuth,bookingBuilder.index);
router.get('/booking/:id',isAuth,bookingBuilder.show);
router.put('/booking/update/:id',isAuth,bookingBuilder.update);
router.delete('/booking/:id',isAuth,bookingBuilder.delete);

module.exports = router;
