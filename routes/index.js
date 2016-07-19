var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Visit = require('../models/visit');
var router = express.Router();


router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});
router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/', function(req, res) {

  var visit = new Visit({
    numVisits: 1
  });

  visit.save(function(err, thor) {
  if (err) return console.error(err);
  console.dir(visit);
});
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { user : req.user });
});


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
