// TODO: - use SQLite3 for lite database
// password - ASc8P7i044jXYa8U
const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://asitsingh:ASc8P7i044jXYa8U@cluster0.8yxys2q.mongodb.net/bookstore?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)

module.exports = () => {
    return mongoose.connect(process.env.MONGODB_CONNECT_URI || dbUri,
        { useNewUrlParser: true, useUnifiedTopology: true })
}