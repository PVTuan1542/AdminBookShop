const con = require('../../config/connection');

//Function to login into admin
function loginAdmin(user) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM employees WHERE user_admin = ?";
        con.query(sql, user, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get data with id
function getIdUserAdmin(id) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM employees WHERE id = ?";
        con.query(sql, id, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}



module.exports = { loginAdmin, getIdUserAdmin }
