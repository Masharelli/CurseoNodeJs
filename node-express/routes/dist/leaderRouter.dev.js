"use strict";

var express = require('express');

var leaderRouter = express.Router();
leaderRouter.use(express.json());
leaderRouter.route('/').all(function (req, res, next) {
  res.status = 200;
  res.setHeader('Content-Type', 'plain/text');
  next();
}).get(function (req, res, next) {
  res.end('Will send the leder to you!');
}).post(function (req, res, next) {
  res.end('Will add the leader: ' + req.body.name + ' with the details ' + req.body.description);
}).put(function (req, res, next) {
  res.status = 403;
  res.end("PUT not supported on /leaders");
})["delete"](function (req, res, next) {
  res.end('Deleting all leaders!');
}); ///// lederId

leaderRouter.route('/:leaderId').get(function (req, res, next) {
  res.end('Will send the details of the leader: ' + req.params.leaderId + ' to you');
}).post(function (req, res, next) {
  res.statusCode = 403;
  res.end('POST not supported  on /leader/' + req.params.leaderId);
}).put(function (req, res, next) {
  // El status code es para determinar que la operacion no es validas
  res.write('Updating the leader: ' + req.params.leaderId + '\n');
  res.end('will uptade the leader: ' + req.body.name + 'with the details: ' + req.body.description);
}) // Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
["delete"](function (req, res, next) {
  res.end('Deleting the leader! ' + req.params.leaderId);
});
module.exports = leaderRouter;