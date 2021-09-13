const Account = require('../models/Account')
const bcrypt = require('bcryptjs');

const { mutipleMongoosesToObject } = require('../../util/mongoose')

class AccountController {


    // [GET] / accounts/ login
    login(req, res, next) {
        res.render('accounts/login', {
            layout: false,
        })
    }

    async saveLogin(req, res, next) {
        const account = await Account.singleByEmail(req.body.email)
        if(account===null){
            return res.render('accounts/login', {
                layout: false,
                err: 'Email hoặc mật khẩu không chính xác',
            })
        }
        const rs = bcrypt.compareSync(req.body.password, account.password)
        if(rs===false){
            return res.render('accounts/login', {
                layout: false,
                err: 'Email hoặc mật khẩu không chính xác',
            })
        }

        res.redirect('accounts/profile')
    }
    // [GET] / accounts/ register
    register(req, res, next) {
        res.render('accounts/register', {
            layout: false,
        })
    }

    // [POST] / accounts/ saveRegister
    saveRegister(req, res, next) {
        const account = new Account(req.body)
        account.save()
            .then(() => res.redirect('/accounts/login'))
            .catch(error => { })
            function Validator(options){

                function getParent(element, selector){
                    while (element.parentElement){
                        if(element.parentElement.matches(selector)){
                            return element.parentElement
                        }
                        element = element.parentElement
                    }
                }
            
                var selectorRules = {}
                
                // Hàm thực hiện validate
                function validate(inputElement, rule){
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
                    var errorMessage 
            
                    //Lấy ra các rules của selector
                    var rules = selectorRules[rule.selector]
            
                    //Lặp qua từng rules và kiểm tra(checked)
                    //Nếu có lỗi thì dừng việc ktra
                    for (var i = 0; i < rules.length; i++){
                        errorMessage = rules[i](inputElement.value)
                        if (errorMessage) break
                    }
            
                    if(errorMessage) {
                        errorElement.innerText = errorMessage
                        getParent(inputElement, options.formGroupSelector).classList.add('invalid')
                    } else {
                        errorElement.innerText = ''
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                    }
            
                    return !errorMessage
                }
            
                // Lấy element của form cần validate
                var formElement = document.querySelector(options.form)
                
                if (formElement){
                    //khi submit form
                    formElement.onsubmit = function(e){
                        e.preventDefault()
            
                        var isFormValid = true
            
                        //Lăp qua từng rules và validate
                        options.rules.forEach(function(rule){
                            var inputElement = formElement.querySelector(rule.selector)
                            var isValid = validate(inputElement,rule)
                            if (!isValid){
                                isFormValid = false
                            }
                        })
                        
            
                        
                        if (isFormValid){
                            //Trường hợp submit với js
                            if (typeof options.onSubmit === 'function'){
                                var enableInputs = formElement.querySelectorAll('[name]')
                                var formValues = Array.from(enableInputs).reduce(function(values, input){
                                    values[input.name] = input.value
                                    return values
                                }, {})
                                options.onSubmit(formValues)
                            }
                            //Trường hợp submit với hành vi mặc định 
                            else {
                                formElement.submit()
                            }
                        }
                    }
            
                    // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input ,...)
                    options.rules.forEach(function(rule){
            
                        //Lưu lại các rules trong mỗi input
                        if(Array.isArray(selectorRules[rule.selector])){
                            selectorRules[rule.selector].push(rule.test)
                        }else {
                            selectorRules[rule.selector] = [rule.test]
                        }
                        // selectorRules[rule.selector] = rule.test
            
                        var inputElement = formElement.querySelector(rule.selector)
                        if (inputElement){
                            // Xử lý trường hợp blur khỏi input
                            inputElement.onblur = function(){
                                validate(inputElement,rule)                       
                                
                            }
                            // Xử lý mỗi khi người dùng nhập vào input
                            inputElement.oninput = function(){
                                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
                                errorElement.innerText = ''
                                getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                            }
                        }
                    })
                    
                }
            }
            Validator.isRequired = function(selector, message){
                return{
                    selector: selector,
                    test: function(value){
                        return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
                    }
                }
            
            }
            Validator.isEmail = function(selector, message){
                return{
                    selector: selector,
                    test: function(value){
                        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        return regex.test(value) ? undefined : message || 'Trường này phải là email'
                        
                    }
                }
            
            }
            Validator.minLength = function(selector, min, message){
                return{
                    selector: selector,
                    test: function(value){
                        return value.length >= min ? undefined : message || `Vui lòng nhập tối thiệu ${min} kí tự`       
                    }
                }
            }
            Validator.isConfirmed = function(selector, getConfirmValue, message){
                return{
                    selector: selector,
                    test: function(value){
                        return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
                    }
                }
            }
    }
    profile(req, res, next) {
        res.render('accounts/profile')
    }

}

module.exports = new AccountController();
