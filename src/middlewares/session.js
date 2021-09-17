const expressSession = require('express-session');

module.exports = function (app) {
    app.set('trust proxy', 1);
    app.use(expressSession({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: false,
        cookie: {}
    }))

}