import express from "express";
import StudentControl from "../controller/StudentControl.js";
const router = express.Router();
router
  .route("/")
  .get(StudentControl.getAllStudent)
  .post(StudentControl.addNewUser);
export default router;
