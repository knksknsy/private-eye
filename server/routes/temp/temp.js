/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const express = require('express');
const router = express.Router();

const airPressure = require('../../models/utils/model.util').airPressure;
var dataCollectCtrl = require('../../controllers/datacollect.ctrl');
const ranges = dataCollectCtrl.ranges;

router.get('/', (req, res) => {
    res.send('temp endpoints work');
});

router.get('/live/:pi_ID', (req, res) => {
    var pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressure.model, airPressure.sensors.temp, ranges.live)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

router.get('/day/:pi_ID', (req, res) => {
    let pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressure.model, airPressure.sensors.temp, ranges.day)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

router.get('/week/:pi_ID', (req, res) => {
    let pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressure.model, airPressure.sensors.temp, ranges.week)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

router.get('/month/:pi_ID', (req, res) => {
    let pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressure.model, airPressure.sensors.temp, ranges.month)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

router.get('/year/:pi_ID', (req, res) => {
    let pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressure.model, airPressure.sensors.temp, ranges.year)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

module.exports = router;
