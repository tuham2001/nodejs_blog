module.exports = function(app) {
    app.use( function(req, res, next) {
        if (req.session.isAuthenticated === null) {
            req.session.isAuthenticated = false;
        }
        res.locals.lcIsAuthenticated = req.session.isAuthenticated
        res.locals.lcAuthAccount = req.session.authAccount
        next()
    })
}