const bcrypt = require('bcryptjs');
const Account = require('../models/Account')
const passport = require('passport')
var auth = require('../../middlewares/auth')
const { mongooseToObject } = require('../../util/mongoose')

class AccountController {

    // [GET] / accounts/ register
    register(req, res, next) {
        res.render('accounts/register', {
            layout: false,
            // title: 'Form Validation',
            success: req.session.success,
            errors: req.session.errors,
        })
        req.session.errors = null
    }

    // [POST] / accounts/ postRegister
    postRegister(req, res, next) {
        const account = new Account(req.body)
        req.check('fullname', 'Vui lòng nhập tên đầy đủ của bạn').isLength({ min: 1 })
        req.check('email', 'Trường này phải là email').isEmail()
        req.check('password', 'Mật khẩu tối thiểu 6 kí tự').isLength({ min: 6 })
        req.check('password', 'Mật khẩu không khớp').equals(req.body.password_confirmation)

        var errors = req.validationErrors()

        if (errors) {
            req.session.errors = errors
            res.redirect('/accounts/register')

        } else {
            const newAccount = new Account({
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role = 0,
            })
            // Hash password
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newAccount.password, salt, (err, hash) => {
                    if (err) throw err;
                    //Set password to hashed
                    newAccount.password = hash;
                    newAccount.save()
                        .then(account => {
                            req.flash('success_msg', 'Đăng ký thành công')
                            res.redirect('/accounts/login')
                        })
                        .catch(err => console.log(err))
                })
            )

        }

    }
    // [GET] / accounts/ login
    login(req, res, next) {
        res.render('accounts/login', {
            layout: false,
        })
    }
    // [POST] / accounts/ login
    postLogin(req, res, next) {

        const email = req.body.email
        const password = req.body.password
        Account.findOne({ $or: [{ email: email }] })
            .then(account => {
                if (account) {
                    bcrypt.compare(password, account.password, function (err, result) {
                        if (err) {
                            res.render('accounts/login', {
                                layout: false,
                            })
                        }
                        if (result) {
                            // delete account.password;
                            req.session.isAuthenticated = true
                            req.session.authAccount = account
                            const retUrl = req.query.retUrl || '/';
                            return res.redirect(retUrl)
                        } else {
                            res.render('accounts/login', {
                                layout: false,
                                err_message: 'Bạn đã nhập sai mật khẩu',
                            })

                        }
                    })
                } else {
                    res.render('accounts/login', {
                        layout: false,
                        err_message: 'Email của bạn chưa được đăng kí',
                    })
                }
            })
            .catch(next)

    }
    logout(req, res, next) {
        req.session.isAuthenticated = false
        req.session.authAccount = null
        res.redirect(req.headers.referer)
    }

}

module.exports = new AccountController();
