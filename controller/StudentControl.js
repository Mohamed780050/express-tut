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
    const response = await Students.getStudentById(id);
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.log(err);
  }
}
async function updateAStudent(req, res) {
  try {
    const { id } = req.body;
    const response = await Students.getStudentById(id);
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.log(err);
  }
}
async function deleteAStudent(req, res) {
  try {
    const { id } = req.params;
    const check = await Students.getStudentById(id);
    if (check.statusCode === 404)
      return res.status(check.statusCode).send(check.data);
    const response = await Students.deleteStudent(id);
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllStudent,
  addNewUser,
  getStudentById,
  updateAStudent,
  deleteAStudent,
};
