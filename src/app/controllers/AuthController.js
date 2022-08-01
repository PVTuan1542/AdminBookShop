const Employees = require('../models/Employees');
const con = require('../../config/connection');
//console.log(customers);
class AuthController {
    //[GET] /auth/login and /
    login(req, res) {
        if (req.method === 'GET') {
            res.render('auth/login', { layout: false });
        }
        if (req.method === 'POST') {
            let userName = req.body.user_admin.replace(/\s/g, '');
            let passWord = req.body.pass_word.replace(/\s/g, '');

            if (userName != "" && passWord != "") {
                Employees.loginAdmin(userName)
                    .then(function (rows) {
                        if (rows.length < 1) {
                            //Send data to login form when does not exist user_admin
                            var log = {
                                classLog: "alert alert-danger alert-dismissible fade show",
                                string: "Error! Tài khoản không tồn tại"
                            }
                            res.render('auth/login', { layout: false, errors: log, values: req.body });
                        } else {
                            //Loop data(query user_admin) and check password true -> return home
                            for (var row of rows) {
                                if (row.pass_word === passWord) {
                                    req.session.userSession = row;
                                    //res.render('home', { values: row });
                                    res.redirect('/home');
                                    return;
                                }
                            }
                            //Send data to login form when does not exist pass_word
                            var log = {
                                classLog: "alert alert-danger alert-dismissible fade show",
                                string: "Error! Sai mật khẩu"
                            }
                            res.render('auth/login', { layout: false, errors: log, values: req.body });
                        }

                    })
                    .catch((err) => { throw err; })
            } else {
                res.send("ERROR!!!");
            }
            //res.json(req.body);
            //res.redirect('/home');
        }
    }
    //[GET] /auth/logout
    logout(req, res) {
        req.session.userSession = null;
        res.redirect('/');
    }


}

module.exports = new AuthController();
