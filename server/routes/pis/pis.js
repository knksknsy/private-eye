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

router.get('/register', (req, res) => {
    if (!req.body || !req.body.id || !req.body.latitude || !req.body.longitude || !req.body.modules) {
        return res.status(500);
    }
    PIModel.create(
        {
            _id: req.body.id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            modules: req.body.modules
        },
        (err, pi) => {
            if (err) return res.status(500);
            if (pi) return res.send(200);
        }
    );
});

router.get('/list', (req, res) => {
    PIModel.find({}, (err, pis) => {
        if (err) return res.status(500);
        return res.send(pis);
    });
});

router.get('/sensors/:pi_ID', (req, res) => {
    PIModel.findById({ _id: req.params.pi_ID }, (err, pi) => {
        if (err) return res.status(500).send(err);
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
