"use strict";

var express = require('express');

var leaderRouter = express.Router();

var mongoose = require('mongoose');

var Leaders = require('../models/leaders');

leaderRouter.use(express.json());
leaderRouter.route('/').get(function (req, res, next) {
  Leaders.find({}).then(function (leader) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  Leaders.create(req.body).then(function (leader) {
    console.log('Leader Created');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).put(function (req, res, next) {
  res.status = 403;
  res.end("PUT not supported on /leaders", leader);
})["delete"](function (req, res, next) {
  Leaders.remove({}).then(function (resp) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}); ///// lederId

leaderRouter.route('/:leaderId').get(function (req, res, next) {
  Leaders.findById(req.params.leaderId).then(function (leader) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  res.statusCode = 403;
  res.end('POST not supported  on /leader/' + req.params.leaderId);
}).put(function (req, res, next) {
  // El status code es para determinar que la operacion no es validas
  Leaders.findByIdAndUpdate(req.params.leaderId, {
    $set: req.body
  }, {
    "new": true
  }).then(function (leader) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}) // Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
["delete"](function (req, res, next) {
  Leaders.findByIdAndRemove(req.params.leaderId).then(function (resp) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
module.exports = leaderRouter;