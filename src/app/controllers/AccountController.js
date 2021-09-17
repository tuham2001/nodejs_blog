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
        // const account = new Account(req.body)
        // req.check('fullname', 'Vui lòng nhập tên đầy đủ của bạn').isLength({ min: 1 })
        // req.check('email', 'Trường này phải là email').isEmail()
        // req.check('password', 'Mật khẩu tối thiểu 6 kí tự').isLength({ min: 6 })
        // req.check('password', 'Mật khẩu không khớp').equals(req.body.password_confirmation)


        var errors = req.validationErrors()

        if (errors) {
            req.session.errors = errors
            res.redirect('/accounts/register')

        } else {
            const newAccount = new Account({
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
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
        // function Validator(options){

        //     function getParent(element, selector){
        //         while (element.parentElement){
        //             if(element.parentElement.matches(selector)){
        //                 return element.parentElement
        //             }
        //             element = element.parentElement
        //         }
        //     }
        
        //     var selectorRules = {}
            
        //     // Hàm thực hiện validate
        //     function validate(inputElement, rule){
        //         var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
        //         var errorMessage 
        
        //         //Lấy ra các rules của selector
        //         var rules = selectorRules[rule.selector]
        
        //         //Lặp qua từng rules và kiểm tra(checked)
        //         //Nếu có lỗi thì dừng việc ktra
        //         for (var i = 0; i < rules.length; i++){
        //             errorMessage = rules[i](inputElement.value)
        //             if (errorMessage) break
        //         }
        
        //         if(errorMessage) {
        //             errorElement.innerText = errorMessage
        //             getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        //         } else {
        //             errorElement.innerText = ''
        //             getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        //         }
        
        //         return !errorMessage
        //     }
        
        //     // Lấy element của form cần validate
        //     var formElement = document.querySelector(options.form)
            
        //     if (formElement){
        //         //khi submit form
        //         formElement.onsubmit = function(e){
        //             e.preventDefault()
        
        //             var isFormValid = true
        
        //             //Lăp qua từng rules và validate
        //             options.rules.forEach(function(rule){
        //                 var inputElement = formElement.querySelector(rule.selector)
        //                 var isValid = validate(inputElement,rule)
        //                 if (!isValid){
        //                     isFormValid = false
        //                 }
        //             })
                    
        
                    
        //             if (isFormValid){
        //                 //Trường hợp submit với js
        //                 if (typeof options.onSubmit === 'function'){
        //                     var enableInputs = formElement.querySelectorAll('[name]')
        //                     var formValues = Array.from(enableInputs).reduce(function(values, input){
        //                         values[input.name] = input.value
        //                         return values
        //                     }, {})
        //                     options.onSubmit(formValues)
        //                 }
        //                 //Trường hợp submit với hành vi mặc định 
        //                 else {
        //                     formElement.submit()
        //                 }
        //             }
        //         }
        
        //         // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input ,...)
        //         options.rules.forEach(function(rule){
        
        //             //Lưu lại các rules trong mỗi input
        //             if(Array.isArray(selectorRules[rule.selector])){
        //                 selectorRules[rule.selector].push(rule.test)
        //             }else {
        //                 selectorRules[rule.selector] = [rule.test]
        //             }
        //             // selectorRules[rule.selector] = rule.test
        
        //             var inputElement = formElement.querySelector(rule.selector)
        //             if (inputElement){
        //                 // Xử lý trường hợp blur khỏi input
        //                 inputElement.onblur = function(){
        //                     validate(inputElement,rule)                       
                            
        //                 }
        //                 // Xử lý mỗi khi người dùng nhập vào input
        //                 inputElement.oninput = function(){
        //                     var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
        //                     errorElement.innerText = ''
        //                     getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        //                 }
        //             }
        //         })
                
        //     }
        // }
        // Validator.isRequired = function(selector, message){
        //     return{
        //         selector: selector,
        //         test: function(value){
        //             return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        //         }
        //     }
        
        // }
        // Validator.isEmail = function(selector, message){
        //     return{
        //         selector: selector,
        //         test: function(value){
        //             var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        //             return regex.test(value) ? undefined : message || 'Trường này phải là email'
                    
        //         }
        //     }
        
        // }
        // Validator.minLength = function(selector, min, message){
        //     return{
        //         selector: selector,
        //         test: function(value){
        //             return value.length >= min ? undefined : message || `Vui lòng nhập tối thiệu ${min} kí tự`       
        //         }
        //     }
        // }
        // Validator.isConfirmed = function(selector, getConfirmValue, message){
        //     return{
        //         selector: selector,
        //         test: function(value){
        //             return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        //         }
        //     }
        // }

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
        Account.findOne({$or: [{email: email}]})
            .then(account => {
                if (account) {
                    bcrypt.compare(password, account.password, function (err, result){
                        if(err) {
                            res.render('accounts/login', {
                                layout: false,                              
                            })
                        }
                        if(result){
                            // delete account.password;
                            req.session.isAuthenticated = true
                            req.session.authAccount = account
                            const retUrl = req.query.retUrl || '/';
                            return res.redirect(retUrl)
                        } else {
                            res.render('accounts/login', {
                                layout: false, 
                                err_message: 'Bạn đã nhập sai mật khẩu' ,
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
