var express = require('express');
var router = express.Router();

const roomBuilder = require('../../app/controllers/cms/Room.controller');
const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.get('/room/',isAuth,roomBuilder.index);
router.get('/room/:id',isAuth,roomBuilder.show);
router.post('/room/store',isAuth,roomBuilder.store);
router.put('/room/update/:id',isAuth,roomBuilder.update);
router.delete('/room/:id',isAuth,roomBuilder.delete);

module.exports = router;
