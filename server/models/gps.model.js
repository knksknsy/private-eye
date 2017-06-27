/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GPSSchema = Schema({
    pi_id: String,
    datetime: Date,
    latitude: Number,
    longitude: Number,
});

mongoose.model('GPS', GPSSchema);
