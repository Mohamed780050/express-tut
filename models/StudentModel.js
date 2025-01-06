import fs from "fs/promises";
import path from "path";
class Student {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  static async getStudents() {
    try {
      const data = await fs.readFile(
        path.join(process.cwd(), "data", "data.json"),
        "utf-8"
      );
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }
  async saveStudent() {
    try {
      console.log({ id: this.id, name: this.name, age: this.age });
      const users = await Student.getStudents();
      users.push({ id: this.id, name: this.name, age: this.age });
      await fs.writeFile(
        path.join(process.cwd(), "data", "data.json"),
        JSON.stringify(users)
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export default Student;
