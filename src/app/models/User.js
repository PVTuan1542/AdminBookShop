const con = require('../../config/connection');

//Function to login into admin
function countUser(user) {
    return new Promise(function (resolve, reject) {
        var sql = "select count(id) as countUser from customers";
        con.query(sql, user, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = { countUser }
