const session = require('express-session');

module.exports = function (app) {
    app.set('trust proxy', 1);
    app.use(session({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: false,
        cookie: { secure: false }
    }))

}