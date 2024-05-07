var express = require('express');
var router = express.Router();

const roleBuilder = require('../../app/controllers/cms/Role.controller');


const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;
const permissionBuilder = require("../../app/controllers/cms/Permission.controller");


router.get('/role/',isAuth, roleBuilder.index);
router.get('/role/:id', isAuth,roleBuilder.show);
router.post('/role/store',isAuth,roleBuilder.store);
router.put('/role/update/:id',isAuth,roleBuilder.update);
router.delete('/role/:id',isAuth,roleBuilder.delete);

module.exports = router;
