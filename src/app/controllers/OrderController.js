
const con = require('../../config/connection');
const Orders = require('../models/Order')
//console.log(customers);
class OrderController {
    //[GET] /orders
    index(req, res) {
        Orders.getOrders().then(function (rows) {
            res.render('orders/order', {
                Orders: rows,
            });
        })
            .catch((err) => { throw err; })
    }

    // [GET] /view
    view(req, res) {
        var orderId = req.params.id;
        Orders.getOrderDetails(orderId).then(function (rows) {
            var data = rows[0]
            res.render('orders/view', {
                OrderDetails: rows,
                orderId: rows.orderId,
            });
        })
            .catch((err) => { throw err; })
    }

    // [GET] /update
    update(req, res) {
        
        var orderId = req.params.id;
        Orders.updateOrder(orderId).then(function (rows) {
            res.redirect('/orders');
        })
            .catch((err) => { throw err; })
    }
}

module.exports = new OrderController();
