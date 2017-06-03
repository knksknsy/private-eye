/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var humiditySchema = Schema({
    // pi_id: { type: Schema.Types.ObjectId, ref: 'PI' },
    pi_id: String,
    datetime: Date,
    temp_C: Number,
    humidity_pct: Number,
});

mongoose.model('Humidity', humiditySchema);
