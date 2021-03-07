const express = require('express');
const leaderRouter = express.Router();
const mongoose = require('mongoose');
const Leaders = require('../models/leaders')

leaderRouter.use(express.json());

leaderRouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(leader);
    }, (err)=> next(err))
    .catch((err)=> next(err));
})

.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        console.log('Leader Created')
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.put((req,res,next)=>{
    res.status = 403;
    res.end("PUT not supported on /leaders" , leader);
})

.delete((req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=> next(err))
    .catch((err)=> next(err));
});

///// lederId
leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err)=> next(err))
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST not supported  on /leader/' + req.params.leaderId);
})
.put((req,res,next)=>{
// El status code es para determinar que la operacion no es validas
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set: req.body
    }, {new: true})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err)=> next(err));
})
// Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
.delete((req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;