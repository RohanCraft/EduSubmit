import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AdminRoutes from "./routes/adminRoutes.js";
import StudentRoutes from "./routes/StudentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(
  cors({
    origin: "https://edusubmit-frontend-35lm.onrender.com",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to Student Data API 🚀");
});

// Mount routes
app.use("/admin", AdminRoutes);
app.use("/students", StudentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
