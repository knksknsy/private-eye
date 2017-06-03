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
var AirPressureModel = mongoose.model('AirPressure');

router.get('/', (req, res) => {
    res.send('airpressure endpoint works');
});

// Weather data is added every 1 or 5 minutes
router.post('/new', (req, res) => {
    if (!req.body || !req.body.pi_ID || !req.body.datetime || !req.body.temp_C || !req.body.pressure_Pa || !req.body.altitude_m) {
        return res.status(500);
    }
    AirPressureModel.create(
        {
            pi_id: req.body.pi_ID,
            datetime: new Date(req.body.datetime),
            temp_C: req.body.temp_C,
            pressure_Pa: req.body.pressure_Pa,
            altitude_m: req.body.altitude_m
        },
        (err) => {
            if (err) return res.status(500);
        }
    );
});

module.exports = router;
