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

router.get('/getlist', (req, res) => {
    PIModel.find({}, (err, pis) => {
        if (err) return res.status(500);
        return res.send(pis);
    });
});

router.get('/register', (req, res) => {
    if (!req.body || !req.body.id || !req.body.latitude || !req.body.longitude) {
        return res.status(500);
    }
    PIModel.create(
        {
            _id: req.body.id,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
        (err, pi) => {
            if (err) return res.status(500);
            if (pi) return res.send(200);
        }
    );
});

module.exports = router;
