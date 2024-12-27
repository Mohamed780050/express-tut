import Students from "../models/StudentModel.js";
async function getAllStudent(req, res) {
  try {
    await Students.getStudents();
    res.send("done");
  } catch (err) {
    console.log(err);
  }
}
async function addNewUser(req, res) {
  try {
    const { id, name, age } = req.body;
    const student = new Students(id, name, age);
    await student.saveStudent();
    res.send("done");
  } catch (err) {
    console.log(err);
  }
}
export default { getAllStudent, addNewUser };
