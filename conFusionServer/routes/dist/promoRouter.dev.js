"use strict";

var express = require('express');

var promoRouter = express.Router();

var mongoose = require('mongoose');

var Promotions = require('../models/promotions');

promoRouter.use(express.json());
promoRouter.route('/').get(function (req, res, next) {
  Promotions.find({}).then(function (promotions) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotions);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  Promotions.create(req.body).then(function (promotion) {
    console.log('Promotion Created', promotion);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).put(function (req, res, next) {
  res.status = 403;
  res.end('PUT not supported in /promotions');
})["delete"](function (req, res, next) {
  Promotions.remove({}).then(function (resp) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
promoRouter.route('/:promoId').get(function (req, res, next) {
  Promotions.findById(req.params.promoId).then(function (promotions) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotions);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  res.statusCode = 403;
  res.end('POST not supported  on /promotion/' + req.params.promoId);
}).put(function (req, res, next) {
  // El status code es para determinar que la operacion no es validas
  Promotions.findByIdAndUpdate(req.params.promoId, {
    $set: req.body
  }, {
    "new": true
  }).then(function (promotion) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}) // Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
["delete"](function (req, res, next) {
  Promotions.findByIdAndRemove(req.params.promoId).then(function (resp) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
module.exports = promoRouter;