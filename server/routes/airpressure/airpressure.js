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
var PIModel = mongoose.model('PI');

router.post('/mock', (req, res, next) => {
    if (!req.body || !req.body.data) {
        return res.status(500).json({ 'message': 'Body invalid.' });
    }
    req.body.data.forEach((value) => {
        if (!value.pi_ID || !value.datetime || !value.temp_C || !value.pressure_Pa || !value.altitude_m) {
            return res.status(500).json({ 'message': 'Body invalid.' });
        }
        AirPressureModel.create(
            {
                pi_id: value.pi_ID,
                datetime: new Date(value.datetime),
                temp_C: value.temp_C,
                pressure_Pa: value.pressure_Pa,
                altitude_m: value.altitude_m
            },
            (err) => {
                if (err) {
                    return next(err);
                }
            }
        );
    });
    return res.send(200);
});

// Weather data is added every 1 or 5 minutes
router.post('/', (req, res, next) => {
    if (!req.body || !req.body.pi_ID || !req.body.datetime || !req.body.temp_C || !req.body.pressure_Pa || !req.body.altitude_m) {
        return res.status(500).json({ 'message': 'Body invalid.' });
    }
    // check if pi_ID is registered
    PIModel.findById({ _id: req.body.pi_ID }, (err, pi) => {
        if (err) return next(err);
        AirPressureModel.create(
            {
                pi_id: pi._id,
                datetime: new Date(req.body.datetime),
                temp_C: req.body.temp_C,
                pressure_Pa: req.body.pressure_Pa,
                altitude_m: req.body.altitude_m
            },
            (err, data) => {
                if (err) return next(err);
                if (data) return res.send(200);
            }
        );
    });
});

module.exports = router;
