const rectangle = require('./rectangle');
var react = require('./rectangle')

function solveRect(l,b){
    console.log("Solving for rectangule with l = " + l  + ", and b = " + b)
    react(l,b, (err, rectangle) =>  {
          if (err) {
              console.log("Error: " + err.message)
          }else{
            console.log(" The area of the rectangle of dimension l = " + l + " b = " + b + " is " + rectangle.area());
            console.log("The perimeter of the rectangle of dimension l = " + l + " b = " + b + " is " + rectangle.perimeter());  
          }
    });
    console.log("This statement is after the call to rect()");
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);