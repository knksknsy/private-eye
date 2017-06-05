/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');

const time = require('time');
var timeZoneCtrl = require('./timezone.ctrl');


const ranges = {
    live: 'live',
    day: 'day',
    week: 'week',
    month: 'month',
    year: 'year'
}

module.exports.ranges = ranges;

/**
 * Collects data of an arbitrary MongoDB's model by predefined ranges.
 * 
 * @param {String} pi_ID ObjectId of MongoDB's PI model
 * @param {String} mongo_model String of an arbitrary MongoDB model. E.g.: 'AirPressure' model. For more models look in '../models' directory.
 * @param {String} model_sensor String of an arbitrary model attribute. E.g.: 'temp_C' for AirPressure model. For more models look in '../models' directory.
 * @returns Promise<{any}>
 */
module.exports.collectDataByRange = function (pi_ID, mongo_model, model_sensor, range) {
    return new Promise((resolve, reject) => {
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
                reject();
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
                        };
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
            .catch((error) => reject(error));
    })
}
