const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FbAccount = new Schema({
  uid: { type: String },
  email: { type: String },
  name: { type: String },
  pic: { type: String },
}, {
  timestamps: true,
})

module.exports = mongoose.model('FbAccount', FbAccount);
