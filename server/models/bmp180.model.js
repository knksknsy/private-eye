/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
// require('./pi.model');
var Schema = mongoose.Schema;

var BMP180Schema = Schema({
    // pi_id: { type: Schema.Types.ObjectId, ref: 'PI' },
    pi_id: String,
    datetime: Date,
    temp_C: Number,
    pressure_Pa: Number,
    altitude_m: Number,
});

mongoose.model('BMP180', BMP180Schema);
