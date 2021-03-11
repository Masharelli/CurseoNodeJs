"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;
var promotionsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  price: {
    type: Currency,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});
var Promotions = mongoose.model('Promotion', promotionsSchema);
module.exports = Promotions;