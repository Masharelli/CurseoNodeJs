"use strict";

var express = require('express');

var router = express.Router();

var _require = require('express'),
    json = _require.json;

var User = require('../models/user');

var passport = require('passport');

router.use(express.json());
/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', function (req, res, next) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        err: err
      });
    } else {
      passport.authenticate('local')(req, res, function () {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: true,
          status: 'Registration Successful!'
        });
      });
    }
  });
});
router.post('/login', passport.authenticate('local'), function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    status: 'You are successfully logged in!'
  });
});
router.get('/logout', function (req, res) {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = router;