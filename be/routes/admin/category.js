var express = require('express');
var router = express.Router();

const controllerBuilder = require('../../app/controllers/cms/Category.controller');
const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.get('/category/',isAuth,controllerBuilder.index);
router.get('/category/:id',isAuth,controllerBuilder.show);
router.post('/category/store',isAuth,controllerBuilder.store);
router.put('/category/update/:id',isAuth,controllerBuilder.update);
router.delete('/category/:id',isAuth,controllerBuilder.delete);

module.exports = router;
