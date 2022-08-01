
const con = require('../../config/connection');
const Order = require('../models/Order')
const User = require('../models/User')
//console.log(customers);
class HomeController {
    //[GET] /home
    index(req, res) {
        Order.countOrder().then(function (rows) {
            var totalOrder = rows[0].countId;

            //Count user
            User.countUser().then(function (rows) {
                var totalUser = rows[0].countUser;

                //Sum quantity the book to sale
                Order.sumQty().then(function (rows) {
                    var totalQty = rows[0].totalQty;

                    //Total money in order
                    Order.totalMoney().then(function (rows) {
                        var totalMoney = rows[0].totalMoney;
                        res.render('home', { totalOrder, totalUser, totalQty, totalMoney });
                    })
                        .catch((err) => { throw err; })

                })
                    .catch((err) => { throw err; })

            })
                .catch((err) => { throw err; })

        })
            .catch((err) => { throw err; })

    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new HomeController();
