const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conner successfully!!!')
    } catch (error) {
        console.log('Conner failure!!!')
    }
}

module.exports = { connect }