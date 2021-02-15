const express = require('express');
const promoRouter = express.Router();

promoRouter.use(express.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'plain/text');
    next();
})

.get((req,res,next)=>{
    res.end('Will send all the promotions to you!');
})

.post((req,res,next)=>{
    res.end('Will add the promotion: ' + req.body.name + ' with the details ' + req.body.description );
})

.put((req,res,next)=>{
    res.status = 403;
    res.end('PUT not supported in /promotions');
})

.delete((req,res,next)=>{
    res.end('Deleting all the promotions!');
})

promoRouter.route('/:promoId')

.get((req,res,next)=>{
    res.end('Will send the details of the promotion: ' + req.params.promoId + ' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST not supported  on /promotion/' + req.params.promoId);
})
.put((req,res,next)=>{
// El status code es para determinar que la operacion no es validas
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('will uptade the promotion: ' + req.body.name + 'with the details: ' + req.body.description);
})
// Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
.delete((req,res,next)=>{
    res.end('Deleting the promotion! ' + req.params.promoId);
});

module.exports = promoRouter;

