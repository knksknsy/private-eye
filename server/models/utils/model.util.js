/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const bmp180 = 'BMP180';
const dht22 = 'DHT22';
// const mongoModel = 'ModelName';

module.exports = {
    sensors: {
        // 'sensorName' : { model: [mongoModel1, ..., mongoModelN], name: 'mongoSensorName'}
        'temp': { model: [bmp180, dht22], name: 'temp_C', title: 'Temperatur', unit: '°C' },
        'pressure': { model: [bmp180], name: 'pressure_Pa', title: 'Luftdruck', unit: 'Pa' },
        'altitude': { model: [bmp180], name: 'altitude_m', title: 'Höhenlage', unit: 'm' },
        'humidity': { model: [dht22], name: 'humidity_pct', title: 'Luftfeuchtigkeit', unit: '%' }
    },
    modules: {
        'BMP180': ['temp_C', 'pressure_Pa', 'altitude_m'],
        'DHT22': ['temp_C', 'humidity_pct']

    },
    ranges: {
        live: 'live',
        day: 'day',
        week: 'week',
        month: 'month',
        year: 'year'
    }
}
