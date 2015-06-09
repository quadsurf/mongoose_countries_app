var express = require("express"),
app = express(),
methodOverride = require('method-override'),
bodyParser = require("body-parser");
db = require("./models");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/', function(req,res){
  res.redirect('/countries');
});

// INDEX
app.get('/countries', function(req,res){
  db.Country.find({},function(err,countries){
    if (err) throw err;
    res.render("countries/index", {countries:countries});
  });

});

// NEW
app.get('/countries/new', function(req,res){
  res.render("countries/new");
});

// CREATE
app.post('/countries', function(req,res){
  db.Country.create(req.body.country,function(err,countries){
      if (err) throw err;
      res.redirect('/');
    });
});

// SHOW

app.get('/countries/:id', function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    if (err) throw err;
    res.render("countries/edit", {country:country});
  });
});

// EDIT

app.get('/countries/:id/edit', function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    if (err) throw err;
    res.render("edit", {country:country});
  });
});

// UPDATE
app.put('/countries/:id', function(req,res){
  db.Country.findByIdAndUpdate(req.params.id, req.body.country, function(err,book){
    if (err) throw err;
    res.redirect('/');
    });
});

// DESTROY
app.delete('/countries/:id', function(req,res){
    db.Country.findByIdAndRemove(req.params.id, function(err,book){
      if (err) throw err;
      res.redirect('/');
    });
});

// CATCH ALL
app.get('*', function(req,res){
  res.render('404');
});

app.listen(3000, function(){
  "Server is listening on port 3000";
});
