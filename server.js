const mongoose = require('mongoose');

const connectDbI = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI);
        console.log("Connected")
    } catch (error) {
        console.log("failed", error)
    }
}

module.exports = connectDbI;