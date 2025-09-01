import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const information = await Student.find().sort({ createdAt: 1 });
    res.json(information);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students information" });
  }
});

// POST a new student
router.post("/", async (req, res) => {
  try {
    const { name, collegeName, domain, degree, age, number } = req.body;
    const newData = await Student.create({
      name,
      collegeName,
      domain,
      degree,
      age,
      number,
    });
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: "Failed to create new student information" });
  }
});

export default router;
