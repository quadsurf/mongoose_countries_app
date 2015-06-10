var mongoose = require("mongoose");

// use country_dev
mongoose.connect("mongodb://localhost/country_dev");
mongoose.set("debug", true);


// ONE WAY WITH TWO STEPS
// var Country = require("./country");
// module.exports.Country = Country;

// SAME EXACT THING!
module.exports.Country = require("./country");











