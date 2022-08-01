
const productRouter = require('./product');
const accountRouter = require('./account');
const orderRouter = require('./order');
const homeRouter = require('./home');
const authRouter = require('./auth');
const statiRouter = require('./statistical');

const authMiddleware = require('../app/middlewares/auth.midleware')

function route(app) {

    app.use(function (req, res, next) {
        if (req.session.userSession) {
            res.locals.user = req.session.userSession;
        }
        next();
    });
    
    app.use('/statistical', authMiddleware.requireAuth,  statiRouter);
    app.use('/products', authMiddleware.requireAuth,  productRouter);
    app.use('/account',  authMiddleware.requireAuth, accountRouter);
    app.use('/orders',  authMiddleware.requireAuth, orderRouter);
    app.use('/auth', authRouter);
    app.use('/home', authMiddleware.requireAuth, homeRouter);
    app.use('/',  authRouter);
    
}
module.exports = route;
