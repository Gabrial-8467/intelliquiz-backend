require("dotenv").config(); // Load env variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Import routes
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));
app.use(express.json());

// MongoDB connection with async/await
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit if DB connection fails
  }
};
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/results", resultRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the IntelliQuiz API 🎯");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
