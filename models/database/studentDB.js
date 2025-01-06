import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { versionKey: false }
);
const StudentModel = new mongoose.model("Students", studentSchema, "Students");
export default StudentModel;
