import { resetErrorsCount } from "ajv/dist/compile/errors.js";
import Students from "../models/StudentModel.js";
async function getAllStudent(req, res) {
  try {
    const users = await Students.getStudents();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
}
async function addNewUser(req, res) {
  try {
    const { id, name, age } = req.body;
    const student = new Students(id, name, age);
    await student.saveStudent();
    const users = await Students.getStudents();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
}
async function getStudentById(req, res) {
  try {
    const { id } = req.params;
    const user = await Students.getStudentById(id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}
export default { getAllStudent, addNewUser, getStudentById };
