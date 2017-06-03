/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

const request = require('request');
const timezoneKey = require('../config/timezone.config').api_key;
var mongoose = require('mongoose');
var PIModel = mongoose.model('PI');

/**
 * Returns PI's local timezone.
 * 
 * @param {String} pi_ID 
 * @returns Promise<{any}>
 */
module.exports.getTimeZone = function (pi_ID) {
    return new Promise((resolve, reject) => {
        PIModel.findById(pi_ID)
            .exec((err, piData) => {
                if (err) {
                    reject(err);
                }
                let location = piData.latitude + ',' + piData.longitude;
                let url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + location + '&timestamp=1458000000&key=' + timezoneKey;
                request(url, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    if (response.statusCode === 200) {
                        let jsonBody = JSON.parse(body);
                        resolve(jsonBody.timeZoneId);
                    }
                });
            });
    });
}

// /**
//  * 
//  * @param {*} pi_ID
//  * @param {*} sensor Schema attribute
//  * @param {*} startDate date
//  * @param {*} endDate date
//  * @param {*} interval_unit in [min, h, d, w, m, y]
//  */
// function getDataTimeSpan(startDate, endDate, interval_unit, pi_ID, sensor) {
//     let units = ['min', 'h', 'd', 'w', 'm', 'y'];

//     if (units.indexOf(interval_unit) !== -1) {
//         switch (interval_unit) {
//             case 'min':
//                 AirPressureModel.find({ pi_id: pi_ID })
//                     .where('datetime').gt(startDate).lte(endDate)
//                     .sort('datetime')
//                     .select('datetime ' + sensor)
//                     .exec((err, airPressureData) => {
//                         let data = [];
//                         airPressureData.forEach((node) => {
//                             data.push({ x: node.datetime, y: node[sensor] });
//                         });
//                         return data;
//                     });
//                 break;
//             case 'h':

//                 AirPressureModel.find({ pi_id: pi_ID })
//                     .where('datetime').gt(startDate).lte(endDate)
//                     .sort('datetime')
//                     .select('datetime ' + sensor)
//                     .exec((err, airPressureData) => {
//                         // data:
//                         // [
//                         //     { averageValues: [ { x: datetime, y: sensorValue } ] },
//                         //     { maxValues: [ { x: datetime, y: sensorValue } ] },
//                         //     { minValues: [ { x: datetime, y: sensorValue } ] },
//                         // ]
//                         let data = [];
//                         let hours = endDate.getHours() - startDate.getHours();

//                         let hourlySensorValues = [];
//                         let averageSensorValues = [];
//                         let minSensorValues = [];
//                         let maxSensorValues = [];

//                         // Collect hourly data
//                         for (let index = 0; index <= hours; index++) {
//                             hourlySensorValues.push(
//                                 airPressureData.filter((node) => {
//                                     return node.datetime.getHours() === endDate.getHours() - index;
//                                 })
//                             );
//                         }

//                         // Calculate max value
//                         for (let index = 0; index <= hours; index++) {
//                             maxSensorValues.push(
//                                 Math.max.apply(Math, hourlySensorValues[index].map((node) => {
//                                     return node[sensor];
//                                 }))
//                             );
//                         }

//                         // Calculate min value
//                         for (let index = 0; index <= hours; index++) {
//                             minSensorValues.push(
//                                 Math.min.apply(Math, hourlySensorValues[index].map((node) => {
//                                     return node[sensor];
//                                 }))
//                             );
//                         }

//                         // Calculate average value
//                         for (let index = 0; index <= hours; index++) {
//                             let sum = 0;
//                             let entries = hourlySensorValues[index].length;
//                             hourlySensorValues.forEach((node) => {
//                                 sum += node[sensor];
//                             });
//                             averageSensorValues.push(sum / entries);
//                         }

//                         // let averageValues = { averageValues: };
//                         // let maxValues = { maxValues: };
//                         // let minValues = { minValues:};

//                         airPressureData.forEach((node) => {
//                             data.push({ x: node.datetime, y: node[sensor] });
//                         });
//                         return data;
//                     });
//                 break;
//             case 'd':
//                 break;
//             case 'w':
//                 break;
//             case 'm':
//                 break;
//             case 'y':
//                 break;
//             default:
//                 res.status(500);
//                 break;
//         }
//     }
//     return;
// }
