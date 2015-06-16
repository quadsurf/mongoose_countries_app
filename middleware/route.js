var db = require("../models");

var routeMiddleware = {
  ensureLoggedIn: function(req, res, next) {

    if (req.session.id !== null && req.session.id !== undefined) {
      return next();
    }
    else {
     res.redirect('/login');
    }
  },

  ensureCorrectUser: function(req, res, next) {
    db.Country.findById(req.params.id, function(err,country){
      if (country.userId !== req.session.id) {
        res.redirect('/countries');
      }
      else {
       return next();
      }
    });
  },

  preventLoginSignup: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      res.redirect('/countries');
    }
    else {
     return next();
    }
  }
};
module.exports = routeMiddleware;