const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Account', Account);
