var express = require('express');
var router = express.Router();

const controllerBuilder = require('../../app/controllers/fe/Menu.controller');


router.route('/menu/').get(controllerBuilder.index);
router.route('/menu/:id').get(controllerBuilder.show);

module.exports = router;
