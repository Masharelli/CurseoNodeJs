"use strict";

var express = require('express');

var dishRouter = express.Router();
dishRouter.use(express.json());
dishRouter.route('/').all(function (req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
}).get(function (req, res, next) {
  res.end('Will send all the dishes to you!');
}).post(function (req, res, next) {
  res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
}).put(function (req, res, next) {
  // El status code es para determinar que la operacion no es validas
  res.statusCode = 403;
  res.end('PUT not supported  on /dishes');
}) // Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
["delete"](function (req, res, next) {
  res.end('Deleting all the dishes!');
}); ///// DishID

dishRouter.route('/:dishId').get(function (req, res, next) {
  res.end('Will send the details of the dishe: ' + req.params.dishId + 'to you');
}).post(function (req, res, next) {
  res.statusCode = 403;
  res.end('POST not supported  on /dishes/' + req.params.dishId);
}).put(function (req, res, next) {
  // El status code es para determinar que la operacion no es validas
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('will uptade the dish: ' + req.body.name + 'with the details: ' + req.body.description);
}) // Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
["delete"](function (req, res, next) {
  res.end('Deleting the dish! ' + req.params.dishId);
});
module.exports = dishRouter;