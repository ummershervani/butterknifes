var express = require('express');
var router = express.Router();
var passport = require("passport");
module.exports = router;


router.get('/login', function (req,res) {
    res.render("login" , { title: "Please login"})
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'

}));

router.get('/logout', function (req,res) {
    req.logout();
    res.redirect("/login")
})
