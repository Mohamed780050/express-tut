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
}

export default Student;
