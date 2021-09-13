const mongoose = require('mongoose')
const TBL_ACCOUNTS = 'account_clc'
const Schema = mongoose.Schema

const Account = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
})
module.exports = {
    singleByEmail: async function (email) {
        const row = await db.load(`select * from ${TBL_ACCOUNTS} where email = '${email}'`)
        if (row.length === 0)
            return null
            
        return row[0]
    }
} 
module.exports = mongoose.model('Account', Account);
