/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PPD42Schema = Schema({
    pi_id: String,
    datetime: Date,
    aqi: Number,
    concentration_ugm3: Number,
    concentration_pcs: Number
});

mongoose.model('PPD42', PPD42Schema);
