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

router.post('/mock', (req, res, next) => {
    if (!req.body || !req.body.data) {
        return res.status(500);
    }
    req.body.data.forEach((value) => {
        if (!req.body || !req.body.data) {
            return res.status(500);
        }
        req.body.data.forEach((value) => {
            if (!value.pi_ID || !value.datetime || !value.temp_C || !value.humidity_pct) {
                return res.status(500);
            }
        });
        HumidityModel.create(
            {
                pi_id: value.pi_ID,
                datetime: new Date(value.datetime),
                temp_C: value.temp_C,
                humidity_pct: value.humidity_pct,
            },
            (err, humidity) => {
                if (err) {
                    return res.status(500);
                }
                if (humidity) {
                    return res.send(200);
                }
            }
        );
    });
});

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
