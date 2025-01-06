import Ajv from "ajv";
const schema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    age: { type: "number" },
  },
};
const ajv = new Ajv();
export default ajv.compile(schema);