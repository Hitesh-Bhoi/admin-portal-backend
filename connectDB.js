const dotEnv = require("dotenv");
const mongoose = require("mongoose");

dotEnv.config();
const mongo_uri = process.env.MONGO_URI;

const connectDB = async() =>{
    try {
        await mongoose.connect(mongo_uri);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error", error);
    }
}

module.exports = connectDB;
