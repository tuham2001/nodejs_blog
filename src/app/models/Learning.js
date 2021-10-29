const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Learning = new Schema({
    name: { type: String },
    videoId: { type: String },
    title: { type: String },
    id: { type: String },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    // role: { type: String },
}, {
    timestamps: true,
})


module.exports = mongoose.model('Learning', Learning)