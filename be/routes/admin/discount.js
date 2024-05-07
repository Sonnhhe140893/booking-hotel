var express = require( 'express' );
var router = express.Router();

const discountBuilder = require( '../../app/controllers/cms/Discount.controller' );


const authMiddleware = require( './../../app/middleware/adminAuthjwt' );
const isAuth = authMiddleware.roleGuards;

router.get( '/discount/', isAuth, discountBuilder.index );
router.get( '/discount/:id', isAuth, discountBuilder.show );
router.post( '/discount/store', isAuth, discountBuilder.store );
router.put( '/discount/update/:id', isAuth, discountBuilder.update );
router.delete( '/discount/:id', isAuth, discountBuilder.delete );
router.post( '/discount/send-mail/:id', isAuth, discountBuilder.sendMail );

module.exports = router;
