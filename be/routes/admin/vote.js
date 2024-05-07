var express = require('express');
var router = express.Router();

const authMiddleware = require('../../app/middleware/adminAuthjwt');
const voteController = require("../../app/controllers/cms/Vote.controller");
const isAuth = authMiddleware.roleGuards;

router.get('/vote', isAuth, voteController.index);
router.get('/vote/:id',isAuth, voteController.show);
router.post('/vote/store',isAuth,voteController.store);
router.put('/vote/update/:id',isAuth,voteController.update);
router.delete('/vote/:id',isAuth,voteController.delete);

module.exports = router;
