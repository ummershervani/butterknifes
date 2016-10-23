var express = require('express');
var app = express();
var foods = require("./data/foods.json");
var bodyparser = require("body-parser");
var _ =require("lodash");
var passport = require("passport");
require("./passport-init");
app.set("views" , "./views");
app.set('view engine', 'jade');
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(require('express-session')({

      secret: 'keyboard cat', resave: false, saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('express-debug')(app, {});

app.use(function (req, res, next){
  console.log(`Incoming Request  ${req.url}`);
  next();
});


var authRouter = require("./auth");
app.use(authRouter);

app.use(function (req, res, next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
    next();
    return;
  }
  res.redirect("/login");
});

app.get('/', function (req,res) {
  res.render("index" , { title: "Home"});
})


var foodAdminRouter = require("./foodadmin");

app.use("/admin",foodAdminRouter);
app.use("/admin",()=>{
  console.log('Admin module invoked');
});

app.listen(function () {
  console.log("App is listening on port 3000");
})

module.exports = app;