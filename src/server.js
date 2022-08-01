const path = require('path');

const con = require('./config/connection');
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const fileupload = require("express-fileupload");
const app = express();
const port = 3001;

const session = require('express-session')

const MySQLStore = require('express-mysql-session')(session);

const route = require('./routes');

//Into img
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/public/uploads')));

//using cookies
app.use(cookieParser())


//Using file upload
app.use(fileupload());

//using session
const sessionStore = new MySQLStore({}, con);

app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 60 * 60 * 10000 * 3 }
}));

//app.use(express.static('client'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// override with POST having ?_method=PUT
app.use(methodOverride('_method'));

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sub: (a, b) => a - b,
            format: function (money) {
                var formatter = new Intl.NumberFormat('en-US', {
                    currency: 'VND',
                    style: 'currency',
                });
                return formatter.format(money);
            },
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Into img
app.use(express.static(path.join(__dirname, 'public')));


//Routes init
route(app);

app.listen(port, () => {
    console.log(`Exmple app admin listening on port ${port}!`)
});