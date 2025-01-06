import StudentsValidator from "../utils/StudentsValidator.js";
export default function checkOnStudent(req, res, nxt) {
  const valid = StudentsValidator(req.body);
  if (!valid) return res.status(400).send(StudentsValidator.errors);
  nxt();
}
