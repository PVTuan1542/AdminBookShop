const con = require('../../config/connection');



//Function to get data with grop by month
function getQtyPriceMonth(id) {
    return new Promise(function (resolve, reject) {
        var sql = "select month(order_date) AS month ,sum(quantity) as sumQty, sum(unit_price) as sumPrice" 
        +" from northwind.order_details as od"
        +" join northwind.orders as o on od.order_id = o.id"
        +" group by month"
        +" order by month asc"
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get data with grop by year
function getQtyPriceYear(id) {
    return new Promise(function (resolve, reject) {
        var sql = "select year(order_date) AS year ,sum(quantity) as sumQty, sum(unit_price) as sumPrice" 
        +" from northwind.order_details as od"
        +" join northwind.orders as o on od.order_id = o.id"
        +" group by year"
        +" order by year asc"
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get data with grop by year
function getQtyPriceQuarter(id) {
    return new Promise(function (resolve, reject) {
        var sql = "select quarter(order_date) AS quarter ,sum(quantity) as sumQty, sum(unit_price) as sumPrice" 
        +" from northwind.order_details as od"
        +" join northwind.orders as o on od.order_id = o.id"
        +" group by quarter"
        +" order by quarter asc"
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


module.exports = { getQtyPriceMonth, getQtyPriceYear, getQtyPriceQuarter }
