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

router.get('/', (req, res) => {
    return res.send('data endpoints work');
});

router.get('/:range/:sensor/:pi_ID', (req, res) => {
    dataCollectCtrl.collectDataByRange(req.params.range, req.params.sensor, req.params.pi_ID)
        .then((liveData) => {
            return res.send(liveData)
        })
        .catch((error) => {
            return res.status(500).send(error);
        });
});

module.exports = router;
