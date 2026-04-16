require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const cors = require("cors"); 

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
// FIXED PATH BELOW: Changed from ./services/ to ./routes/
const appointmentRoutes = require("./routes/appointmentRoutes"); 
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors()); 
app.use(express.json());

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

mongoose.connect(mongoUri)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);
app.use("/api", profileRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Health Backend is live!");
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});