var express = require('express');
var router = express.Router();

const menuBuilder = require('../../app/controllers/cms/Menu.controller');
const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.get('/menu/',isAuth,menuBuilder.index);
router.get('/menu/:id',isAuth,menuBuilder.show);
router.post('/menu/store',isAuth,menuBuilder.store);
router.put('/menu/update/:id',isAuth,menuBuilder.update);
router.delete('/menu/:id',isAuth,menuBuilder.delete);

module.exports = router;
