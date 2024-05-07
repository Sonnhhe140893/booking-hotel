var express = require('express');
var router = express.Router();

const bookingBuilder = require('../../app/controllers/fe/Booking.controller');

const authMiddleware = require('./../../app/middleware/userAuthjwt');
const isAuth = authMiddleware.isAuth;

router.route('/booking/callback').get(bookingBuilder.webhook);
router.route('/booking/cancel/:id').post(bookingBuilder.cancel);
router.get('/booking',bookingBuilder.index);
router.route('/booking/').post(bookingBuilder.add);
router.get('/booking/:id',bookingBuilder.show);


module.exports = router;
