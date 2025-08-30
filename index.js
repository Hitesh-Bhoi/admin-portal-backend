const dotEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
// Load environment variables
dotEnv.config();
const app = express();

// Allow origin to access the backend
app.use(
  cors({
    origin: (origin, callback) => {
      // Origin URLs
      const allowedOrigins = [
        "http://localhost:3000",
        "https://admin-portal-topaz.vercel.app/",
      ];

      // No origin like curl or Postman allow it for now
      if (!origin) return callback(null, true); // no error, allow true

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS: Origin not allowed"), false);
      }
    },
    credentials: true,
  })
);

// Parse cookie
app.use(cookieParser());

// Post data
app.use(express.json());

const port = process.env.PORT || 8000;

connectDB();

// Default API route
app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
