"use strict";

var assert = require('assert');

exports.insertDocument = function (db, document, collection, callback) {
  var coll = db.collection(collection);
  return coll.insert(document);
};

exports.findDocuments = function (db, collection, callback) {
  var coll = db.collection(collection);
  return coll.find({}).toArray();
};

exports.removeDocument = function (db, document, collection, callback) {
  var coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = function (db, document, update, collection, callback) {
  var coll = db.collection(collection);
  return coll.updateOne(document, {
    $set: update
  }, null);
};