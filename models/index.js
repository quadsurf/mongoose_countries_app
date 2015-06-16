var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/country_app_with_auth");
mongoose.set("debug", true)

module.exports.User = require("./user");
module.exports.Country = require("./country");