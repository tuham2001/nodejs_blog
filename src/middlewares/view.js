const hbs_sections = require('express-handlebars-sections');
const handlebars = require('express-handlebars');

module.exports = function(app) {
    app.engine(
        'hbs',
        handlebars({
            extname: '.hbs',
            helpers: {
                section: hbs_sections(),
                sum: (a, b) => a + b,
            }
        }),
    );
    app.set('view engine', 'hbs');
    
}