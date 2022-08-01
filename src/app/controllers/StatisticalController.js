const Stati = require('../models/Stati')
const con = require('../../config/connection');
const { response } = require('express');
//console.log(customers);
class statiController {
    //[GET] /home
    month(req, res) {
        Stati.getQtyPriceMonth().then(function (rows) {
            var data = [];
            for (var i = 0; i <= 11; i++) {
                var obj = {
                    "month": i + 1,
                    "sumPrice": 0,
                    "sumQty": 0,
                }
                data[i] = obj;
            }

            for (var i = 0; i <= 11; i++) {
                if (rows[i]) {
                        data[rows[i].month - 1] = rows[i];
                }
            }
            
            res.render('statistical/month', { data: data });
        })
            .catch((err) => { throw err; })
    }

    year(req, res) {
        Stati.getQtyPriceYear().then(function (rows) {
            //res.json(rows);
            
            res.render('statistical/year', { data: rows });
        })
            .catch((err) => { throw err; })
    }

    quarter(req, res) {
        Stati.getQtyPriceQuarter().then(function (rows) {
            //res.json(rows);
            
            res.render('statistical/quarter', { data: rows });
        })
            .catch((err) => { throw err; })
    }

}

module.exports = new statiController();