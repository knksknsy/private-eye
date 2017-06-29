/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MQT135Schema = Schema({
    pi_id: String,
    datetime: Date,
    gas: Number
});

mongoose.model('MQT135', MQT135Schema);
