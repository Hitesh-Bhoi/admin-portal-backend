const dotEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB");
const UserRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotEnv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

const port = process.env.PORT || 8000;

connectDB();

app.use("/api", UserRoutes);
app.use("/api", authRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});

