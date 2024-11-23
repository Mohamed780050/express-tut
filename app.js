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
app.use(express.urlencoded({ extended: true }));
// we use it to make the server understand the json in the request body if it is json
app.use(express.json());

app.get("^/$|home(.html)?", (req, res) => {
  const validate = ajv.validate(schema, { name: 5, age: 20 });
  console.log(validate);
  res.sendFile(path.join(process.cwd(), "view/home.html"));
});

app.listen(port, () => console.log(`working on http://localhost:${port}`));
