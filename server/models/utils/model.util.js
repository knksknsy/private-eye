/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const bmp180 = 'BMP180';
const dht22 = 'DHT22';
const ppd42 = 'PPD42';
// const mongoModel = 'ModelName';

module.exports = {
    sensors: {
        // 'sensorName' : { model: [mongoModel1, ..., mongoModelN], name: 'mongoSensorName'}
        'temp_C': { model: [bmp180, dht22], name: 'temp_C', title: 'Temperatur', unit: '°C' },
        'pressure_Pa': { model: [bmp180], name: 'pressure_Pa', title: 'Luftdruck', unit: 'Pa' },
        'altitude_m': { model: [bmp180], name: 'altitude_m', title: 'Höhenlage', unit: 'm' },
        'humidity_pct': { model: [dht22], name: 'humidity_pct', title: 'Luftfeuchtigkeit', unit: '%' },
        'aqi': { model: [ppd42], name: 'aqi', title: 'Luftqualitätsindex', unit: 'Punkte' },
        'concentration_ugm3': { model: [ppd42], name: 'concentration_ugm3', title: 'Staubkonzentration', unit: 'µg/m³' },
        'concentration_pcs': { model: [ppd42], name: 'concentration_pcs', title: 'Staubkonzentration', unit: 'pcs/l' },
    },
    modules: {
        'BMP180': ['temp_C', 'pressure_Pa', 'altitude_m'],
        'DHT22': ['temp_C', 'humidity_pct'],
        'PPD42': ['aqi', 'concentration_ugm3', 'concentration_pcs']
    },
    ranges: {
        live: 'live',
        day: 'day',
        week: 'week',
        month: 'month',
        year: 'year'
    }
}
