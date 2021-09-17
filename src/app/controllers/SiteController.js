const Course = require('../models/Course')
const { mutipleMongoosesToObject } = require('../../util/mongoose')

class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                console.log(req.session.authAccount)
                res.render('home', { 
                    courses: mutipleMongoosesToObject(courses)
                })
            })
            .catch(next)
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
