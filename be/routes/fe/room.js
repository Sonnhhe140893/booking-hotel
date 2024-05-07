var express = require('express');
var router = express.Router();

const roomBuilder = require('../../app/controllers/fe/Room.controller');


router.route('/room/').get(roomBuilder.index);
router.route('/room/:id').get(roomBuilder.show);

module.exports = router;
