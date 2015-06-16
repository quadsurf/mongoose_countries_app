var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require("./models"),
    methodOverride = require("method-override"),
    session = require("cookie-session"),
    morgan = require("morgan"),
    loginMiddleware = require("./middleware/login");
    routeMiddleware = require("./middleware/route");

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(loginMiddleware);

app.use(session({
  maxAge: 3600000,
  secret: 'illnevertell',
  name: "chocolate chip"
}));

app.get('/', routeMiddleware.ensureLoggedIn, function(req,res){
  res.redirect('/countries');
});

app.get('/signup', routeMiddleware.preventLoginSignup ,function(req,res){
  res.render('users/signup', {errorMessage: undefined});
});

app.post("/signup", function (req, res) {
  var newUser = req.body.user;
  db.User.create(newUser, function (err, user) {
    if (user) {
      req.login(user);
      res.redirect("/countries");
    } else {
      console.log(err);
      res.render("users/signup", {errorMessage: "Email or password can not be blank"});
    }
  });
});


app.get("/login", routeMiddleware.preventLoginSignup, function (req, res) {
  res.render("users/login", {errorMessage: undefined});
});

app.post("/login", function (req, res) {
  db.User.authenticate(req.body.user,
  function (err, user) {
    if (!err && user !== null) {
      req.login(user);
      res.redirect("/countries");
    } else {
      res.render("users/login", {errorMessage: err});
    }
  });
});


// INDEX
app.get('/countries', routeMiddleware.ensureLoggedIn, function(req,res){
  db.Country.find({},function(err,countries){
    if (err) throw err;
    res.render("countries/index", {countries:countries});
  });
});

// NEW
app.get('/countries/new', routeMiddleware.ensureLoggedIn, function(req,res){
  res.render("countries/new");
});

// CREATE
app.post('/countries', routeMiddleware.ensureLoggedIn, function(req,res){
    var country = new db.Country(req.body.country);
    var cities = req.body.cities.split(", ");
    country.cities = cities;
    country.userId = req.session.id;
    country.save(function(err){
      if (err) throw err;
      res.redirect('/countries');
    });
});

// SHOW

app.get('/countries/:id', routeMiddleware.ensureLoggedIn, function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    if (err) throw err;
    res.render("countries/show", {country:country});
  });
});

// EDIT
app.get('/countries/:id/edit', routeMiddleware.ensureLoggedIn, routeMiddleware.ensureCorrectUser, function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    if (err) throw err;
    res.render("countries/edit", {country:country});
  });
});

// UPDATE
app.put('/countries/:id/', routeMiddleware.ensureLoggedIn, routeMiddleware.ensureCorrectUser, function(req,res){
  db.Country.findById(req.params.id,function(err,country){

    // loop over all keys in req.body.country object
    // set all their values
    for(var prop in req.body.country){
      country[prop] = req.body.country[prop];
    }

    country.cities = req.body.cities.split(", ");
    country.save(function(err){
      if (err) throw err;
      res.redirect('/countries');
    });
  });
});

// DESTROY
app.delete('/countries/:id', routeMiddleware.ensureLoggedIn, routeMiddleware.ensureCorrectUser, function(req,res){
    db.Country.findByIdAndRemove(req.params.id, function(err,book){
      if (err) throw err;
      res.redirect('/countries');
    });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// CATCH ALL
app.get('*', function(req,res){
  res.render('404');
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is listening on port 3000");
});
