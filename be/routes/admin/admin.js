var express = require('express');
var router = express.Router();

const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;
const adminBuilder = require("../../app/controllers/cms/Admin.controller");

router.get('/admin/',isAuth, adminBuilder.index);
router.get('/admin/:id', isAuth,adminBuilder.show);
router.post('/admin/store',isAuth,adminBuilder.store);
router.put('/admin/update/:id',isAuth,adminBuilder.update);
router.delete('/admin/:id',isAuth,adminBuilder.delete);

module.exports = router;
