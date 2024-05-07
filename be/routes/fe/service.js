var express = require('express');
var router = express.Router();

const serviceBuilder = require('../../app/controllers/fe/Service.controller');


router.route('/service/').get(serviceBuilder.index);
router.route('/service/:id').get(serviceBuilder.show);

module.exports = router;
