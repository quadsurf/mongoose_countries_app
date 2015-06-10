var express = require("express"),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    db = require("./models");

app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/', function(req,res){
  res.redirect('/countries');
});

/************ COUNTRY ROUTES *************/

// INDEX
app.get('/countries', function(req,res){
  db.Country.find({},function(err,countries){
    // handle errors in development
      // OPTION A+B - CAN WE PLEASE MOVE ON?!?!?
      if (err) {
        console.log("ERROR", err);
        res.status(500).send(err);
      }
    console.log(countries)
    res.render("countries/index", {countries:countries});
  });
});

// NEW - BEFORE SHOW, SO THAT SHOW DOES NOT CATCH /countries/new
app.get('/countries/new', function(req,res){
  res.render("countries/new");
});

// SHOW
app.get('/countries/:id', function(req,res){
  db.Country.findById(req.params.id, function(err,country){
    res.render("countries/show", {country:country});
  });
});

// EDIT
app.get('/countries/:id/edit', function(req,res){
  res.render("countries/edit");
});

// CREATE
app.post('/countries', function(req,res){
  // console.log(req.body.country)
  db.Country.create(req.body.country, function(err){
    res.redirect("/countries");
  });
});

// UPDATE
app.put('/countries/:id', function(req,res){
  res.redirect("/countries");
});

// DESTROY
app.delete('/countries/:id', function(req,res){
  res.redirect("/countries");
});

// CATCH ALL - AT THE VERY VERY VERY VERY VERY BOTTOM
app.get('*', function(req,res){
  res.render('errors/404');
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
