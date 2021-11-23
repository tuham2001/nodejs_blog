// npm start
// npm run watch
const FbAccount = require('./app/models/FbAccount')
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport')
const { urlencoded } = require('express');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db')

// const accounts = []
// Connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
// gửi từ code js
app.use(express.json());

app.use(methodOverride('_method'))

app.use(expressValidator());

require('./middlewares/session')(app)
require('./middlewares/view')(app)
require('./middlewares/locals')(app)

app.set('views', path.join(__dirname, 'resources', 'views'));
//Connect -flash
app.use(flash())

function sendData() {
    fetch('getFruits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: e.value }),
    })
}

// Login Facebook
var FacebookStrategy = require('passport-facebook').Strategy

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
    done(null, user)
})
passport.deserializeUser(function (user, done) {
    done(null, user)
})

passport.use(new FacebookStrategy({
    clientID: '289060633096536',
    clientSecret: '5546b59d95eb2e2344336b25fde446dc',
    callbackURL: "https://a783-171-255-242-29.ngrok.io/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'picture.type(large)', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        return cb(null, profile)
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/accounts/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get('/home', isLoggedIn, (req, res, next) => {
    res.json(req.user)
})
// route middleware to make sure
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


const restrict = require('./middlewares/auth')
const checkAdmin = require('./middlewares/checkAdmin')
//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


