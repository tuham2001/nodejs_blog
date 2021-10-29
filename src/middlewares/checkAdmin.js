
module.exports = function (req, res, next) {
  var role = req.session.authAccount.role;
  if (role >= 1) {
    next()
  } else {
    res.render('me/access')
  }
}