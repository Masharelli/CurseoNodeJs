"use strict";

module.exports = function (x, y, callback) {
  if (x <= 0 || y <= 0) {
    setTimeout(function () {
      return callback(new Error("Dimension should be greater than 0: l = " + x + ", and b is = " + y), null);
    }, 2000);
  } else {
    setTimeout(function () {
      return callback(null, {
        perimeter: function perimeter() {
          return 2 * (x + y);
        },
        area: function area() {
          return x * y;
        }
      });
    }, 2000);
  }
};