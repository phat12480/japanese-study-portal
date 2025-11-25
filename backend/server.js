const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Mongo
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vocab", require("./routes/vocabRoutes"));
app.use("/api/grammar", require("./routes/grammarRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running & MongoDB connected!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
