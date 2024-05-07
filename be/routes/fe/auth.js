var express = require('express');
var router = express.Router();
const authBuilder = require('../../app/controllers/Auth.controller');


const authMiddleware = require('./../../app/middleware/userAuthjwt');
const isAuth = authMiddleware.isAuth;

router.route('/auth/register').post(authBuilder.register);
router.route('/auth/login').post(authBuilder.login);
router.route('/auth/send-mail').post(authBuilder.sendMailPassword);
router.route('/auth/reset-password').put(authBuilder.changePassword);

router.get('/profile',isAuth, authBuilder.getProfile);
router.put('/profile',isAuth, authBuilder.updateInfo);
router.put('/change-password',isAuth, authBuilder.changePassword);

module.exports = router;
