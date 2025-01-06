import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose
  .connect(`${process.env.DatabaseLink}students`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const studentSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { versionKey: false }
);
const StudentModel = new mongoose.model("Students", studentSchema, "Students");
class Student {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  static async getStudents() {
    try {
      const data = await StudentModel.find();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async saveStudent() {
    try {
      await StudentModel.create({
        id: this.id,
        name: this.name,
        age: this.age,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default Student;
