const express = require('express');
const promoRouter = express.Router();
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

promoRouter.use(express.json());

promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err)=> next(err))
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log('Promotion Created', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err)=> next(err))
    .catch((err)=> next(err));
})
.put((req,res,next)=>{
    res.status = 403;
    res.end('PUT not supported in /promotions');
})

.delete((req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=> next(err))
    .catch((err) => next(err));
})

promoRouter.route('/:promoId')
.get((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promotions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err)=> next(err))
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST not supported  on /promotion/' + req.params.promoId);
})
.put((req,res,next)=>{
// El status code es para determinar que la operacion no es validas
   Promotions.findByIdAndUpdate(req.params.promoId,{
       $set: req.body
   }, {new: true})
   .then((promotion)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promotion);
   },(err) => next(err))
   .catch((err)=> next(err));
})
// Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
.delete((req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;

