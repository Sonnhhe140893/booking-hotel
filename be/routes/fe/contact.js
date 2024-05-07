var express = require('express');
var router = express.Router();

const contactBuilder = require('../../app/controllers/fe/Contact.controller');


router.route('/contact').post(contactBuilder.store);

module.exports = router;
