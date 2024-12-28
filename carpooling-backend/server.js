const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Import auth routes
require('dotenv').config();  // Add this line at the top of your server.js to load the environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection (direct connection string used)
mongoose.connect("mongodb://127.0.0.1:27017/carpooling")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use Auth Routes
app.use("/auth", authRoutes);  // This should be correct

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
