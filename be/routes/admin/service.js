var express = require('express');
var router = express.Router();

const serviceBuilder = require('../../app/controllers/cms/Service.controller');
const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.get('/service/',isAuth,serviceBuilder.index);
router.get('/service/:id',isAuth,serviceBuilder.show);
router.post('/service/store',isAuth,serviceBuilder.store);
router.put('/service/update/:id',isAuth,serviceBuilder.update);
router.delete('/service/:id',isAuth,serviceBuilder.delete);

module.exports = router;
