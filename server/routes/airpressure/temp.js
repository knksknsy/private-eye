/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const express = require('express');
const router = express.Router();

var dataCollectCtrl = require('../../controllers/datacollect.ctrl');
const ranges = dataCollectCtrl.ranges;

const airPressureModel = 'AirPressure';
const tempSensor = 'temp_C';

router.get('/', (req, res) => {
    res.send('temp endpoints work');
});

// Weather data is added every 1 or 5 minutes

// Get previous 6 hours (interval of 5m) of air pressure data by PI's id
router.get('/live/:pi_ID', (req, res) => {
    var pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressureModel, tempSensor, ranges.live)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

router.get('/day/:pi_ID', (req, res) => {
    let pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressureModel, tempSensor, ranges.day)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

router.get('/week/:pi_ID', (req, res) => {
    let pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressureModel, tempSensor, ranges.week)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

router.get('/month/:pi_ID', (req, res) => {
    let pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressureModel, tempSensor, ranges.month)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

router.get('/year/:pi_ID', (req, res) => {
    let pi_ID = req.params.pi_ID;
    dataCollectCtrl.collectDataByRange(pi_ID, airPressureModel, tempSensor, ranges.year)
        .then((liveData) => res.send(liveData))
        .catch((error) => res.status(500).json(error));
});

module.exports = router;
