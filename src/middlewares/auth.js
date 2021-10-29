
module.exports = function (req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect(`/accounts/login?retUrl=${req.originalUrl}`)
    }
    next()

}