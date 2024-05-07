var express = require('express');
var router = express.Router();

const articleBuilder = require('../../app/controllers/cms/Article.controller');
const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.get('/article/',isAuth,articleBuilder.index);
router.get('/article/:id',isAuth,articleBuilder.show);
router.post('/article/store',isAuth,articleBuilder.store);
router.put('/article/update/:id',isAuth,articleBuilder.update);
router.delete('/article/:id',isAuth,articleBuilder.delete);

module.exports = router;
