import express from "express";
import mongoose, { Mongoose } from "mongoose";
import cors from "cors";
import chalk from "chalk";
import dbInit from "./db/index.js";
import userRouter from "./routers/user.router.js";
import userProgressRouter from "./routers/userProgress.router.js";

import ErrorResponse from "./utils/ErrorResponse.js";
import errorHandler from "./middlewares/errorHandler.js";
import upload from "./middlewares/upload.js";
import cookieParser from "cookie-parser";

// Datenbank aufrufen
await dbInit();

const app = express();
const port = process.env.PORT || 8000;

// CORS für Cookies
app.use(
  cors({
    origin: "https://hogwarts-and-the-hat-project.onrender.com",

    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Cloudinary hier aufrufen
app.use(express.static("uploads"));

// Routen
app.use("/user", userRouter);
app.use("/userProgress", userProgressRouter);

// Mongoose chikcen, ob die Verbindung läuft
app.get("/", async (req, res) => {
  const dbResponse = await mongoose.connection.db.admin().ping();
  if (dbResponse.ok !== 1) throw new ErrorResponse("DB is not connected", 503);
  res.json({ message: "Running", dbResponse });
});

// File Upload Route
app.post("/file-upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({
    message: "File upload successful",
    location: req.file?.secure_url || req.file?.path,
  });
});

// Alle Route checken
app.use(/.*/, (req, res) => {
  throw new ErrorResponse(`Check route. You used ${req.originalUrl}`, 404);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.bgGreen(`H.A.T. is listening on port ${port}`));
});
