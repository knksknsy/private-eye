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
var HumidityModel = mongoose.model('Humidity');
var PIModel = mongoose.model('PI');

// Weather data is added every 1 or 5 minutes
router.post('/', (req, res) => {
    if (!req.body || !req.body.pi_ID || !req.body.datetime || !req.body.temp_C || !req.body.humidity_pct) {
        return res.status(500);
    }
    // check if pi_ID is registered
    PIModel.findById({ _id: req.body.pi_ID }, (err, pi) => {
        if (err) return res.status(403);
        HumidityModel.create(
            {
                pi_id: pi._id,
                datetime: new Date(req.body.datetime),
                temp_C: req.body.temp_C,
                humidity_pct: req.body.humidity_pct,
            },
            (err, data) => {
                if (err) return res.status(500);
                if (data) return res.send(200);
            }
        );
    });
});

module.exports = router;
