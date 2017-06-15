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
const moduleNames = require('../../models/utils/model.util').modules;
const sensors = require('../../models/utils/model.util').sensors;

router.post('/register', (req, res, next) => {
    if (!req.body || !req.body.pi_ID || !req.body.latitude || !req.body.longitude || !req.body.modules) {
        return res.status(500).json({ 'message': 'Body invalid.' });
    }
    PIModel.create(
        {
            _id: req.body.pi_ID,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            modules: req.body.modules
        },
        (err) => {
            if (err) {
                return next(err);
            }
        }
    );
    return res.send(200);
});

router.get('/list', (req, res, next) => {
    PIModel.find({}, (err, pis) => {
        if (err) return next(err);
        return res.send(pis);
    });
});

router.get('/sensors/:pi_ID', (req, res, next) => {
    PIModel.findById({ _id: req.params.pi_ID }, (err, pi) => {
        if (err) return next(err);
        let sensorsList = []
        // store sensors in array
        pi.modules.forEach((moduleModel) => {
            if (moduleNames[moduleModel] !== undefined) {
                moduleNames[moduleModel].forEach((sensor) => {
                    sensorsList.push(sensor);
                });
            }
        });
        // remove duplicate sensors
        let unique = sensorsList.filter((sensor, index, self) => {
            return index == self.indexOf(sensor);
        });
        sensorsList = [];
        unique.forEach((sensor) => {
            let sensorName = sensor.split('_')[0];
            sensorsList.push({
                sensor: sensorName,
                title: sensors[sensorName].title,
                unit: sensors[sensorName].unit
            });
        })
        return res.send(sensorsList);
    });
})

module.exports = router;
