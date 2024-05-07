var express = require('express');
var router = express.Router();


const roomRouter = require("./room");
const articleRouter = require("./article");
const serviceRouter = require("./service");
const authRouter = require("./auth");
const bookingRouter = require("./booking");
const contractRouter = require("./contact");
const menuRouter = require("./menu");
const discountRouter = require("./discount");
const voteRouter = require("./vote");
const CategoryRouter = require("./category");

router.use(roomRouter);
router.use(articleRouter);
router.use(serviceRouter);
router.use(authRouter);
router.use(bookingRouter);
router.use(contractRouter);
router.use(menuRouter);
router.use(discountRouter);
router.use(voteRouter);
router.use(CategoryRouter);

module.exports = router;
