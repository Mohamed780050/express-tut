import express from "express";
import StudentControl from "../controller/StudentControl.js";
import checkOnStudent from "../middlewares/StudentValidatorMW.js";
const router = express.Router();
router
  .route("/")
  .get(StudentControl.getAllStudent)
  .post(checkOnStudent, StudentControl.addNewUser);
router
  .route("/:id")
  .get(StudentControl.getStudentById)
  .delete(StudentControl.deleteAStudent);
export default router;
