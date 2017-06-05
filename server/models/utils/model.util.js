/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

module.exports = {
    airPressure: { 
        model: 'AirPressure',
        sensors: {
            temp: 'temp_C',
            pressure: 'pressure_Pa',
            altitude: 'altitude_m'
        }
    },
    humidity: {
        model: 'Humidity',
        sensors: {
            temp: 'temp_C',
            humidity: 'humidity_pct'
        }
    }
}