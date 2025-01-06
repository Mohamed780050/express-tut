import express from "express";
import dotenv from "dotenv";
import path from "path";
import Ajv from "ajv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ejs from "ejs";
import student from "./routes/studentRoute.js";
import mongoose from "mongoose";

dotenv.config();
const ajv = new Ajv();
const app = express();
const port = process.env.port;
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
  },
};
// const students = [
//   { name: "Ali", age: 14 },
//   { name: "Ahmed", age: 18 },
//   { name: "Omer", age: 34 },
// ];
// we use this middleware because the res.body() is going to be undefined that middleware allow express to read the body that is send with the post, put and patch requests.
// Built in middleware
app.use(express.urlencoded({ extended: true }));
// we use it to make the server understand the json in the request body if it is json
// Built in middleware
app.use(express.json());
// to make that path available to the all route
// Built in middleware
app.use(express.static(path.join(process.cwd(), "public")));

// if you did not use cookie parser it will not read the cookie that is in the browser
app.use(cookieParser());

// helmet is a 3rd party middleware that add some more HTTP header to secure you web you can see it from the network tab on the browser
app.use(helmet());

// setting the app
app.set("template engine", "ejs");
// you will have to use this line if you wanna change the views file you can make it views and let it and it will understand it with it's own
app.set("views", "view");

// Route middleware
// after finishing this one it will go the the next because next function
// you can use all or get or any other method from the http method
app.all("^/$|home(.html)?", (req, res, next) => {
  console.log("req received");
  next();
});
app.use("/api/students", student);
app.get(
  "/signin(.html)?",
  (req, res, next) => {
    console.log("directing to the signin page");
    next();
  },
  (req, res) => {
    res.sendFile(path.join(process.cwd(), "view/signIn.html"));
  }
);

app.post(
  "/welcome(.html)?",
  (req, res, next) => {
    console.log("receiving data");
    next();
  },
  (req, res) => {
    const { fname, lname } = req.body;
    // added cookie and if you left it like that without expires it will be a session cookie
    res.cookie("fname", fname);
    // here we can used the expires to make sure the cookie will be removed after specific time and you should write a data
    // but for maxAge you are using duration and that maybe a lot easer since you write 5d or 1m and so on
    res.cookie("lname", lname, { httpOnly: true });
    res.cookie("age", Buffer.from("25").toString("base64"));
    res.send(`thank you ${fname} ${lname} for this`);
  }
);

app.get(
  "^/$|home(.html)?",
  // you can pass more than one of these handler but make sure to use next function to go to the next handler
  (req, res, next) => {
    console.log("first middleware");
    next();
  },
  (req, res) => {
    const validate = ajv.validate(schema, { name: 5, age: 20 });
    console.log(validate);
    res.sendFile(path.join(process.cwd(), "view/home.html"));
  }
);
app.get("/cookie", (req, res) => {
  const { fname, lname, age } = req.cookies;
  res.send(
    `first Name is: ${fname}\nlast Name is: ${lname}\nYou are ${atob(age)}`
  );
});

// app.get("/api/students", (req, res) => {
//   res.set("Access-Control-Allow-origin", "*");
//   res.render("student.ejs", { students: students });
// });
// mongoose
//   .connect(`mongodb://localhost:27017/Employees`, {
//     // this is for new mongodb url and it is true by default.
//     useNewUrlParser: true,
//     // this is for unified topology and it is true by default and make the driver more efficient.
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("working"))
//   .catch((err) => console.log(err));
// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   id: { type: Number, required: true, unique: true },
// });
// // making a model and that model is the object that will be used to do the CRUD operations.
// const StudentModel = new mongoose.model("Employee", studentSchema, "Employee");

// StudentModel.find()
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
// StudentModel.find({ name: /^m/ })
//   .select({ name: 1 })
//   .sort({ name: 1 })
//   .then((result) => console.log(result));
// StudentModel.find()
//   .or({ name: "mohamed" }, { name: "omer" })
//   .select({ name: 1 })
//   .sort({ name: 1 })
//   .then((result) => console.log(result));
dotenv.config();
// we put that here because we don't wanna every time you send or get a response for the database you will start a new connection.
mongoose
  .connect(`${process.env.DatabaseLink}students`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`working on http://localhost:${port}`));
