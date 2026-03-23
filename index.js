require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;


// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);


// MongoDB Connection
mongoose.connect(mongoUri)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err));


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);
app.use("/api", profileRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use(errorHandler);


// Basic Routes
app.get("/", (req, res) => {
  res.send("Health Backend is live and connected to DB!");
});

app.get("/dashboard", (req, res) => {
  res.send("Myhealth Backend Running 🚀");
});


// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

