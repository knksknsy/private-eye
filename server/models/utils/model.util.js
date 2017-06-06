/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const airpressure = 'AirPressure';
const humidity = 'Humidity';
// const mongoModel = 'ModelName';

module.exports = {
    sensors: {
        // 'sensorName' : { model: mongoModel, name: 'mongoSensorName'}
        'temp': { model: airpressure, name: 'temp_C' },
        'airpressure': { model: airpressure, name: 'pressure_Pa' },
        'altitude': { model: airpressure, name: 'altitude_m' },
        'humidity': { model: humidity, name: 'humidity_pct' }
    },
    ranges: {
        live: 'live',
        day: 'day',
        week: 'week',
        month: 'month',
        year: 'year'
    }
}