"use strict";

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var dboper = require('./operations'); //Saber que nos conectamos a la database


var url = 'mongodb://localhost:27017/'; //Accedemos a a la database que creamos

var dbname = 'conFusion'; //Manejamos los errores 

MongoClient.connect(url).then(function (client) {
  //Verificamos que no sea  nulo en dado caso marcar error
  assert.strictEqual(err, null);
  console.log('Connected Correctly to server');
  var db = client.db(dbname);
  dboper.insertDocument(db, {
    name: "Vadonut",
    description: "Test"
  }, "dishes").then(function (result) {
    console.log("Insert Document:\n", result.ops);
    return dboper.findDocuments(db, "dishes");
  }).then(function (docs) {
    console.log("Found Documents:\n", docs);
    return dboper.updateDocument(db, {
      name: "Vadonut"
    }, {
      description: "Updated Test"
    }, "dishes");
  }).then(function (result) {
    console.log("Updated Document:\n", result.result);
    return dboper.findDocuments(db, "dishes");
  }).then(function (docs) {
    console.log("Found Updated Documents:\n", docs);
    return db.dropCollection("dishes");
  }).then(function (result) {
    console.log("Dropped Collection: ", result);
    return client.close();
  })["catch"](function (err) {
    return console.log(err);
  });
})["catch"](function (err) {
  return console.log(err);
});