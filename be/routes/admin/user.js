var express = require('express');
var router = express.Router();

const userBuilder = require('../../app/controllers/cms/User.controller');
const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.get('/user/',isAuth,userBuilder.index);
router.get('/user/:id',isAuth,userBuilder.show);
router.post('/user/store',isAuth,userBuilder.store);
router.put('/user/update/:id',isAuth,userBuilder.update);
router.delete('/user/:id',isAuth,userBuilder.delete);

module.exports = router;
