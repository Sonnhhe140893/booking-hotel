var express = require('express');
var router = express.Router();

const staticBuilder = require('../../app/controllers/cms/Static.controller');
const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.route('/monthly-statistics').get(staticBuilder.monthlyStatistics);


module.exports = router;
