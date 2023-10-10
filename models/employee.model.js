const mongoose = require('mongoose')

module.exports = mongoose.model('List', {
    name: { type: String },
    todo: { type: String },
    status: { type: String },
    date: { type: String },
})