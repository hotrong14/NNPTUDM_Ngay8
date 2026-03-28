import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import dotenv from "dotenv";
import { importUsers } from "./services/importService.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const upload = multer({ dest: "uploads/" });

app.post("/import", upload.single("file"), async (req, res) => {
  try {
    await importUsers(req.file.path);
    res.json({ message: "Import success & emails sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Import failed" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});