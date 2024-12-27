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
      await fs.appendFile(
        path.join(process.cwd(), "data", "data.json"),
        JSON.stringify({ id: this.id, name: this.name, age: this.age })
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export default Student;
