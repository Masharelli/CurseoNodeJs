const express = require('express');

const dishRouter = express.Router();

dishRouter.use(express.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})

.post((req,res,next)=>{
    res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description)
})

.put((req,res,next)=>{
    // El status code es para determinar que la operacion no es validas
    res.statusCode = 403;
    res.end('PUT not supported  on /dishes');
})

// Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
.delete((req,res,next)=>{
    res.end('Deleting all the dishes!');
});


module.exports = dishRouter; 