import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    collegeName: {
      type: String,
      required: [true, "College is required"],
      trim: true,
    },
    domain: {
      type: String,
      required: [true, "Domain is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    age: {
      type: Number,
    },
    number: {
      type: Number,
      required: [true, "Number is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;