/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');
var PIModel = mongoose.model('PI');

router.get('/', (req, res) => {
    PIModel.find({}, (err, pis) => {
        if (err) return res.status(500);
        res.send(pis);
    });
});

module.exports = router;
