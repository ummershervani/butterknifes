var express = require("express");
var _ = require("lodash");
var foods = require("./data/foods.json");
var router = express.Router();

module.exports = router;

router.use(function (req, res, next){
    if(req.user.admin){
        next();
        return;
    }
    res.redirect("/login");
});

router.get('/foods', function (req, res) {
    res.render("foods", {
        title: "What you will love",
        foods: foods
    })
})

router.route('/foods/add')
    .get(function (req, res) {
        res.render("addfood");
    })
    .post(function (req, res) {
        var food = {
            name: req.body.name,
            description: req.body.description,
            id: req.body.id
        };
        foods.push(food);
        res.redirect(req.baseUrl + "/foods");
    })


router.route('/foods/edit/:id')
    .all( (req,res, next) => {
        var foodid = req.params.id;
        var food = _.find(foods, r => r.id === foodid);
        if (!food) {
           next(new Error('Oh no, this is unfortunate'));
        }
        res.locals.food =  food;
        next();
    })
    .post(function (req, res) {

        res.locals.food.name = req.body.name,
            food.description = req.body.description,
            food.id = req.body.id

        res.redirect(req.baseUrl + "/foods");
    })
    .get(function (req, res) {
        res.render("editfood");

    })

router.get('/foods/delete/:id', function (req, res) {

    var foodid = req.params.id;
    foods = foods.filter(r => r.id !== foodid);
    res.redirect(req.baseUrl + "/foods");


})
