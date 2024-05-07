var express = require('express');
var router = express.Router();

const articleBuilder = require('../../app/controllers/fe/Article.controller');


router.route('/article/').get(articleBuilder.index);
router.route('/article/:id').get(articleBuilder.show);

module.exports = router;
