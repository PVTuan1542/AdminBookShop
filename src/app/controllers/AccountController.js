
const con = require('../../config/connection');
//console.log(customers);
class AccountController {
    //[GET] /home
    index(req, res) {
        res.render('account/account');
    }
}

module.exports = new AccountController();