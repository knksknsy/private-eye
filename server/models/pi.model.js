/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PISchema = Schema({
    _id: { type: String, required: true, unique: true },
    latitude: Number,
    longitude: Number,
    modules: [String]
});

mongoose.model('PI', PISchema);
