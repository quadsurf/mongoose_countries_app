var mongoose = require("mongoose");

// MAKE A SCHEMA - SETTING UP MY DATA

// var thing = {
//   this.name: name,
//   this.age: age
// }

var countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // another way of writing this mongoose schema type
  flag: {
    type:String
  },
  capital: String,
  population: Number
});

// MAKE A MODEL

var Country = mongoose.model("Country", countrySchema);

module.exports = Country;

// create is CLASS method
// Country.create({name:"France"});

// // create an instance of the Country class
// var germany = new Country({name: "Germany"});
// // use an instance method
// germany.save();















