/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const express = require('express');
const router = express.Router();

const airpressure = require('./airpressure/airpressure');
const temp = require('./airpressure/temp');

router.get('/', (req, res) => {
    res.send('api works');
});

// Route is used for storing new data to MongoDB's AirPressure model (PI's endpoint)
router.use('/airpressure', airpressure);

// Route is used for getting temperature data (Client's endpoint)
router.use('/temp', temp);

module.exports = router;