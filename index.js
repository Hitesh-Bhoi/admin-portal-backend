const dotEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

dotEnv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 8000;

connectDB();

app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});