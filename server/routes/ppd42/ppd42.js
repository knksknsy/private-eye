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
var PPD42Model = mongoose.model('PPD42');
var PIModel = mongoose.model('PI');

router.post('/batch', (req, res, next) => {
    console.log('/batch called');
    if (!req.body || !req.body.data) {
        return res.status(500).json({ 'message': 'Body invalid.' });
    }
    req.body.data.forEach((value) => {
        if (!value.pi_ID || !value.datetime || value.aqi === null || value.aqi === undefined || !value.concentration_ugm3 || !value.concentration_pcs) {
            return res.status(500).json({ 'message': 'Body invalid.' });
        }
        PPD42Model.create(
            {
                pi_id: value.pi_ID,
                datetime: new Date(value.datetime),
                aqi: value.aqi,
                concentration_ugm3: value.concentration_ugm3,
                concentration_pcs: value.concentration_pcs
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
    if (!req.body || !req.body.pi_ID || !req.body.datetime || req.body.aqi === null || req.body.aqi === undefined || !req.body.concentration_ugm3 || !req.body.concentration_pcs) {
        return res.status(500).json({ 'message': 'Body invalid.' });
    }
    // check if pi_ID is registered
    PIModel.findById({ _id: req.body.pi_ID }, (err, pi) => {
        if (err) return next(err);
        PPD42Model.create(
            {
                pi_id: pi._id,
                datetime: new Date(req.body.datetime),
                aqi: req.body.aqi,
                concentration_ugm3: req.body.concentration_ugm3,
                concentration_pcs: req.body.concentration_pcs
            },
            (err, data) => {
                if (err) return next(err);
                if (data) return res.send(200);
            }
        );
    });
});

module.exports = router;
