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
        // 'sensorName' : { model: [mongoModel1, ..., mongoModelN], name: 'mongoSensorName'}
        'temp': { model: [airpressure, humidity], name: 'temp_C', title: 'Temperatur', unit: '°C' },
        'pressure': { model: [airpressure], name: 'pressure_Pa', title: 'Luftdruck', unit: 'Pa' },
        'altitude': { model: [airpressure], name: 'altitude_m', title: 'Höhenlage', unit: 'm' },
        'humidity': { model: [humidity], name: 'humidity_pct', title: 'Luftfeuchtigkeit', unit: '%' }
    },
    modules: {
        'AirPressure': ['temp_C', 'pressure_Pa', 'altitude_m'],
        'Humidity': ['temp_C', 'humidity_pct']

    },
    ranges: {
        live: 'live',
        day: 'day',
        week: 'week',
        month: 'month',
        year: 'year'
    }
}
