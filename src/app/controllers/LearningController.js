const Learning = require('../models/Learning')
const Course = require('../models/Course')

const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongoosesToObject } = require('../../util/mongoose')

class LearningController {

    // [GET] /learnings/ name
    async show(req, res, next) {
        Learning.find({ name: req.params.name })
            .then(learnings => {
                res.render('learnings/show', {
                    learnings: mutipleMongoosesToObject(learnings),
                    // layout: false
                })
            })
            .catch(next)
        // let learnings = []
        // let current_lesson = {}
        // if (req.query.id) {
        //     Learning.find({ id: req.query.id })
        //         .then(lesson => {
        //             current_lesson = lesson
        //         })
        //         .catch(next)
        // }
        // Learning.find({ name: req.params.name })
        //     .then(learnings => {
        //         learnings = learnings
        //     })
        //     .catch(next)


        // res.render('learnings/show', {
        //     learnings: mutipleMongoosesToObject(learnings),
        //     current_lesson: mutipleMongoosesToObject(learnings)
        // })
    }
    lesson(req, res, next) {
        Learning.find({})
            .then(learnings => {
                res.render('learnings/lesson', {
                    learnings: mutipleMongoosesToObject(learnings)
                })
            })
            .catch(next)
    }
    async create(req, res, next) {

        // const { courseID } = req.params
        // const newLearning = new Learning(req.body)
        // const course = await Course.findById(courseID)
        // newLearning.course_id = course
        // await newLearning.save()
        // course.learnings.push(newLearning._id)
        // await course.save()
        // res.status(201).json({ learnings: newLearning })
    }

}

module.exports = new LearningController();
