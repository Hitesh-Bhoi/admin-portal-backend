const dotEnv = require("dotenv");
const mongoose = require("mongoose");
dotEnv.config();

// MongoDB server URI
const mongo_uri = process.env.MONGO_URI;

// Connect MongoDB to Node.js Server
const connectDB = async() =>{
    try {
        await mongoose.connect(mongo_uri);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

module.exports = connectDB;
