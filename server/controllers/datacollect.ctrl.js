/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var PIModel = mongoose.model('PI');

const time = require('time');
var timeZoneCtrl = require('./timezone.ctrl');

const sensors = require('../models/utils/model.util').sensors;
const ranges = require('../models/utils/model.util').ranges;

/**
 * Collects data of an arbitrary MongoDB's model by predefined ranges.
 * 
 * @param {String} range String of an arbitrary range. E.g.: 'live'. For more ranges look in ranges property.
 * @param {String} sensor String of an arbitrary sensor. E.g.: 'temp'. For more sensors look in '../models/utils/model.util' file.
 * @param {String} pi_ID ObjectId of MongoDB's PI model
 * @returns Promise<{any}>
 */
module.exports.collectDataByRange = function (range, sensor, pi_ID) {
    return new Promise((resolve, reject) => {
        if (Object.keys(ranges).indexOf(range) === -1 || Object.keys(sensors).indexOf(sensor) === -1) {
            reject({ message: 'INVALID REQUEST.' });
        }

        // check if pi_ID is registered
        PIModel.findById({ _id: pi_ID }, (err, pi) => {
            if (err) {
                reject(err);
            }

            const mongo_model = sensors[sensor].model;
            const model_sensor = sensors[sensor].name;
            let timespan;
            let endDate = new time.Date();
            let startDate;

            switch (range) {
                case ranges.live:
                    // Collects live- and previous 6 hours of arbitrary AirPressure  data
                    timespan = 6;
                    startDate = new time.Date(new time.Date().setHours(endDate.getHours() - timespan));
                    break;
                case ranges.day:
                    // Collects previous 24 hours of arbitrary AirPressure data
                    timespan = 1;
                    startDate = new time.Date(new time.Date().setDate(endDate.getDate() - timespan));
                    break;
                case ranges.week:
                    //Collects previous 7 days of arbitrary AirPressure data
                    timespan = 7;
                    startDate = new time.Date(new time.Date().setDate(endDate.getDate() - timespan));
                    break;
                case ranges.month:
                    //Collects previous 31 days of arbitrary AirPressure data
                    timespan = 1;
                    startDate = new time.Date(new time.Date().setMonth(endDate.getMonth() - timespan));
                    break;
                case ranges.year:
                    //Collects previous 365 days of arbitrary AirPressure data
                    timespan = 1;
                    startDate = new time.Date(new time.Date().setFullYear(endDate.getFullYear() - timespan));
                    break;
                default:
                    reject({ message: 'INVALID REQUEST' });
            }

            timeZoneCtrl.getTimeZone(pi_ID)
                .then((timezone) => {
                    endDate.setTimezone(timezone);
                    startDate.setTimezone(timezone);

                    mongoose.model(mongo_model)
                        .find({ pi_id: pi_ID })
                        .where('datetime').gte(startDate).lte(endDate)
                        .sort('datetime')
                        .select('datetime ' + model_sensor)
                        .exec((err, modelData) => {
                            if (err) {
                                reject(err);
                            }
                            // // Data structure version 1
                            // let map = [];
                            // modelData.forEach((data) => {
                            //     map.push({ x: data.datetime, y: data[model_sensor] });
                            // });
                            // resolve(map);

                            // Data structure version 2
                            let xAxis = [];
                            let yAxis = [];
                            modelData.forEach((element) => {
                                xAxis.push(element.datetime);
                                yAxis.push(element[model_sensor]);
                            });
                            resolve({ data: yAxis, labels: xAxis });
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}
