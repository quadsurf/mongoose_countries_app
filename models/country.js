var mongoose = require("mongoose")

var countrySchema = new mongoose.Schema({
  name: String,
  flag: String,
  capital: String,
  population: Number,
  cities: []
});

var Country = mongoose.Model("Country", countrySchema);

module.exports = Country;