const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log('database connected successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;