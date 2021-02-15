const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");




const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req,res,next)=>{
    res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description)
});

app.put('/dishes', (req,res,next)=>{
    // El status code es para determinar que la operacion no es validas
    res.statusCode = 403;
    res.end('PUT not supported  on /dishes');
});

// Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
app.delete('/dishes', (req,res,next)=>{
    res.end('Deleting all the dishes!');
});

///// DishID
app.get('/dishes/:dishId', (req,res,next)=>{
    res.end('Will send the details of the dishe: ' + req.params.dishId + 'to you');
});

app.post('/dishes/:dishId', (req,res,next)=>{
    res.statusCode = 403;
    res.end('POST not supported  on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req,res,next)=>{
// El status code es para determinar que la operacion no es validas
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('will uptade the dish: ' + req.body.name + 'with the details: ' + req.body.description);
});

// Tenemos que tener cuidado porque aqui se borra toda la informacion del lado del servidor
app.delete('/dishes/:dishId', (req,res,next)=>{
    res.end('Deleting the dish! ' + req.params.dishId);
});

app.use((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1> This is a Express Server </h1></body></html>');

});


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server runningh at http://${hostname}:${port}`);
});


