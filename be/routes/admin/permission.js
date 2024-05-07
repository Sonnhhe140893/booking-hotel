var express = require('express');
var router = express.Router();

const permissionBuilder = require('../../app/controllers/cms/Permission.controller');


const authMiddleware = require('./../../app/middleware/adminAuthjwt');
const isAuth = authMiddleware.roleGuards;

router.get('/permission/',isAuth, permissionBuilder.index);
router.post('/permission/store',isAuth,permissionBuilder.store);
router.route('/permission/seed').get(permissionBuilder.seed);
router.put('/permission/update/:id',isAuth,permissionBuilder.update);
router.delete('/permission/:id',isAuth,permissionBuilder.delete);
router.get('/permission/:id', isAuth,permissionBuilder.show);
module.exports = router;
