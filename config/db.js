const mongoose = require('mongoose');
const keys = require('../config/keys');

const dbConStr = keys.mongodbConStr;

const connectDB = async () => {
    try {
        await mongoose.connect(dbConStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connectd...');
    } catch (err) {
        console.log(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
