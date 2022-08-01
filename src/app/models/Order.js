const con = require('../../config/connection');

//Function to get all info of the products
function getOrders() {
    return new Promise(function (resolve, reject) {
        var sql = "select o.id as orderId , c.first_name, c.last_name, o.order_date, c.address, c.city, os.status_name as status_name "
            + " from orders o"
            + " join orders_status os on os.id = o.status_id"
            + " join customers c on o.customer_id = c.id"
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get a order info  where constomer_id = ?
function getOrderDetails(orderId) {
    return new Promise(function (resolve, reject) {
        var sql = "select o.id as orderId, od.id as orderDetailId, pd.product_name, pd.product_img, od.unit_price, od.quantity, od.unit_price * od.quantity as total, os.status_name " +
            " from order_details od" +
            " join orders o on od.order_id = o.id" +
            " join products pd on od.product_id = pd.id" +
            " join orders_status os on os.id = o.status_id " +
            " where o.id = ?"

        con.query(sql, orderId, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
//update
function updateOrder(OrderId) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE `northwind`.`orders` SET `status_id` = '1' WHERE id = ? "

        con.query(sql, OrderId, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


//Count order
function countOrder() {
    return new Promise(function (resolve, reject) {
        var sql = "select count(id) as countId from orders"

        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Count quantity sale in order detail
function sumQty() {
    return new Promise(function (resolve, reject) {
        var sql = "select sum(quantity) as totalQty from order_details"

        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Sum total money in order detail
function totalMoney() {
    return new Promise(function (resolve, reject) {
        var sql = "select sum(quantity*unit_price) as totalMoney from order_details"
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
module.exports = { getOrders, getOrderDetails, updateOrder, countOrder, sumQty, totalMoney };