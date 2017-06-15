/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const express = require('express');
const router = express.Router();

const pis = require('./pis/pis');
const bmp180 = require('./bmp180/bmp180');
const dht22 = require('./dht22/dht22');
const data = require('./data/data');

router.get('/', (req, res) => {
    return res.send('api works');
});

// Route is used for getting registered PIs and their coordinates
router.use('/pis', pis);

// Route is used for storing new data to MongoDB's BMP180 model (PI's endpoint)
router.use('/bmp180', bmp180);

// Route is used for storing new data to MongoDB's DHT22 model (PI's endpoint)
router.use('/dht22', dht22);

// Route is used for getting arbitrary data by range and sensor (Client's endpoint)
router.use('/data', data);

module.exports = router;