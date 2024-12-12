import express from "express";
import dotenv from "dotenv";
import path from "path";
import Ajv from "ajv";

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
// we use this middleware because the res.body() is going to be undefined that middleware allow express to read the body that is send with the post, put and patch requests.
// Built in middleware
app.use(express.urlencoded({ extended: true }));
// we use it to make the server understand the json in the request body if it is json
// Built in middleware
app.use(express.json());
// to make that path available to the all route
// Built in middleware
app.use(express.static(path.join(process.cwd(), "public")));

// Route middleware
// after finishing this one it will go the the next because next function
// you can use all or get or any other method from the http method
app.all("^/$|home(.html)?", (req, res, next) => {
  console.log("req received");
  next();
});

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

app.listen(port, () => console.log(`working on http://localhost:${port}`));
