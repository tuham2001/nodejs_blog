// npm start
// npm run watch
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const { urlencoded } = require('express');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db')

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

//HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: { 
            section : hbs_sections(),
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Home, search, contact

//Routes init
route(app);

    app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
