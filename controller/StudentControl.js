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
    console.log(req.body);
    const student = new Students(id, name, age);
    await student.saveStudent();
    const users = await Students.getStudents();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
}
export default { getAllStudent, addNewUser };
