//const Employees = require('../models/Employees');

module.exports.requireAuth = function (req, res, next) {
    if (!req.session.userSession) {
        res.redirect('/');
        return;
    }
    next();
    //res.json(req.session.userSession);

    // Employees.getIdUserAdmin(req.user.id)
    //     .then(function (rows) {
    //         if (rows.length < 1) {
    //             res.redirect('/auth/login');
    //             return;
    //         } else {
    //             next();
    //         }

    //     })
    //     .catch((err) => { throw err; })
};