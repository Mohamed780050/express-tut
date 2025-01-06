import studentDB from "./database/studentDB.js";

class Student {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  static async getStudents() {
    try {
      const data = await studentDB.find();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async saveStudent() {
    try {
      await studentDB.create({
        id: this.id,
        name: this.name,
        age: this.age,
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getStudentById(id) {
    try {
      const data = await studentDB.findOne({ id: id });
      if (!data) return { statusCode: 404, data: "Student not found" };
      return { statusCode: 200, data: data };
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteStudent(id) {
    try {
      await studentDB.deleteOne({ id: id });
      return { statusCode: 200, data: "Student deleted successfully" };
    } catch (err) {
      console.log(err);
    }
  }
}

export default Student;
