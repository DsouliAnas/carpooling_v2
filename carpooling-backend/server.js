const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file
const { verifyToken } = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection using .env for credentials
mongoose
  .connect(process.env.MONGODB_URI) // Use environment variable for MongoDB URI
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Auth Routes
const authRoutes = require("./routes/auth");

// Use Auth Routes
app.use("/auth", authRoutes);

// Example of a Protected Route
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
