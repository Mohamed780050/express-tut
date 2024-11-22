import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.port;

app.get("^/$|home(.html)?", (req, res) => {
  res.sendFile(path.join(process.cwd(), "view/home.html"));
});

app.listen(port, () => console.log(`working on http://localhost:${port}`));
