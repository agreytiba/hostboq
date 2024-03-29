const mongoose = require('mongoose');
const dotenv = require("dotenv");
const colors = require("colors");


// Check if required environment variables are present
if (!process.env.DATABASE_NAME) {
    console.error('DATABASE_NAME environment variable is not defined in the .env file');
    process.exit(1);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_NAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;


