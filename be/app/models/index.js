const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./User.model");
db.role = require("./Role.model");

db.ROLES = ["ADMIN", "USER"];

module.exports = db;
