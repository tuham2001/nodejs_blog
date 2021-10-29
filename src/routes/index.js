const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const accountsRouter = require('./accounts');
const learningsRouter = require('./learnings');

function route(app) {
    app.use('/learnings', learningsRouter)
    app.use('/accounts', accountsRouter)
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);

}

module.exports = route;
