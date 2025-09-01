import express from "express";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ===== Admin Login =====
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check against environment variables
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate a simple JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

// ===== Middleware to protect routes =====
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ===== Get all students =====
router.get("/students", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: 1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// ===== Delete a student by ID =====
router.delete("/students/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

export default router;
