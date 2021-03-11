"use strict";

var mongoose = require('mongoose');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';
var connect = mongoose.connect(url, {
  useNewUrlParser: true
});
connect.then(function (db) {
  console.log("Connected correctly to server");
  Dishes.create({
    name: 'Uthappizza',
    description: 'test'
  }).then(function (dish) {
    console.log(dish);
    return Dishes.findByIdAndUpdate(dish._id, {
      $set: {
        description: 'Updated test'
      }
    }, {
      "new": true
    }).exec();
  }).then(function (dish) {
    console.log(dish);
    dish.comments.push({
      rating: 5,
      comment: 'test comment',
      author: 'Juan Cazarez'
    });
    return dish.save();
  }).then(function (dish) {
    console.log(dish);
    return Dishes.deleteMany({});
  }).then(function () {
    return mongoose.connection.close();
  })["catch"](function (err) {
    console.log(err);
  });
});