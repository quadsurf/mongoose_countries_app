var db = require("../models");

var loginMiddleware = function (req, res, next) {

  req.login = function (user) {
    req.session.id = user._id;
  };

  req.logout = function () {
    req.session.id = null;
  };

  next();
};

module.exports = loginMiddleware;