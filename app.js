var express = require('express');
var app = express();
var foods = require("./data/foods.json");
var bodyparser = require("body-parser");
app.set("views" , "./views");
app.set('view engine', 'jade');
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', function (req,res) {
  res.render("index" , { title: "Home"})
})


app.get('/admin/foods', function (req,res) {
  res.render("foods", {
    title: "What you will love",
    foods: foods
  })
})


app.get('/admin/foods/add', function (req,res) {
  res.render("addfood");
})

app.post('/admin/foods/add', function (req,res) {
  var food = {
    name : req.body.name,
    description: req.body.description,
    id : req.body.id
  };
  foods.push(food);
  res.redirect("/admin/foods");
})

app.get('/admin/foods/delete/:id', function (req,res) {

  var foodid =req.params.id;
  foods = foods.filter(r => r.id !== foodid);
  res.redirect("/admin/foods");
})



app.listen(function () {
  console.log("App is listening on port 3000");
})

module.exports = app;