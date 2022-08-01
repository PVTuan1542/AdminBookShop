const con = require('../../config/connection');

//Function to get all info of the products
function getProducts() {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM products ";
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to insert a products into data products
function insertOneProduct(objProduct, img) {
    return new Promise(function (resolve, reject) {
        let date_ob = new Date();
        var sql = "INSERT INTO northwind.products ( `product_name`, `description`, `list_price`, `category`, `author`, `quantity_per_unit`,`product_img`, `createAt`) VALUES ? ";
        var values = [[objProduct.product_name, objProduct.description, objProduct.list_price, objProduct.category, objProduct.author, objProduct.minimum_reorder_quantity, img, date_ob]];
        con.query(sql, ([values]), function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to update a products into data products
function updateOneProducts(objProduct) {
    return new Promise(function (resolve, reject) {
        let date_ob = new Date();
        var sql = "UPDATE northwind.products SET `product_name` = ?, `description` = ?, `list_price` = ?, `category` = ?, `author` = ?,`quantity_per_unit` = ?,`product_img` = ?, `updateAt` = ? where id = ?";
        var values = [objProduct.product_name, objProduct.description, objProduct.list_price, objProduct.category, objProduct.author, objProduct.minimum_reorder_quantity, objProduct.product_img, objProduct.id];
        con.query(sql, [objProduct.product_name, objProduct.description, objProduct.list_price, objProduct.category, objProduct.author, objProduct.minimum_reorder_quantity, objProduct.product_img, date_ob, objProduct.id], function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to delete a product into data products
function deleteOneProduct(id) {
    return new Promise(function (resolve, reject) {
        var sql = "DELETE FROM `northwind`.`products` WHERE (`id` = ?);";
        con.query(sql, id, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
//Function to get 16 Product info  limit = start, end ?
function getProductsLimit(start, end) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM products LIMIT ?";
        con.query(sql, [[start, end]], function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Funtion get count
function getCountProductst() {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT count(id) as count FROM products ";
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = { getProducts, insertOneProduct, updateOneProducts, deleteOneProduct, getProductsLimit, getCountProductst };

