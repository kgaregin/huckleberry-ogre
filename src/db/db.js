"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var config_1 = require("./config");
var post_1 = require("./models/blog/post");
var _a = config_1.config.db.remote, host = _a.host, port = _a.port, name = _a.name, user = _a.user, password = _a.password, dialect = _a.dialect;
var sequelize = new Sequelize(name, user, password, {
    host: host, port: port, dialect: dialect
});
exports.sequelize = sequelize;
sequelize.import('post', post_1.PostModel);
sequelize.sync().then(function () {
    console.log("db synchronised successful");
}).catch(function (error) {
    console.log("db synchronise error: " + error);
});
