const Course = require('../models/Course')
const Learning = require('../models/Learning')
const { mutipleMongoosesToObject } = require('../../util/mongoose')

class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongoosesToObject(courses)
                })
            })
            .catch(next)
    }

    // [GET] /search
    search(req, res, next) {
        res.render('search')
    }

    async postSearch(req, res, next) {
        let payload = req.body.payload.trim()
        let search = await Learning.find({ title: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec()
        //Limit search result to 10
        search = search.slice(0, 10)
        res.send({ payload: search })
    }

}

module.exports = new SiteController();
