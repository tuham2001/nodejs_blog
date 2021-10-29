// npm start
// npm run watch
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
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


const restrict = require('./middlewares/auth')
const checkAdmin = require('./middlewares/checkAdmin')
//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


