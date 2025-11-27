import dotenv from "dotenv";
import { connectDB } from "./db/config.js";
import express from "express";

dotenv.config();
import app from "./app.js";

const PORT = process.env.PORT || 8000;
connectDB();

app.listen(PORT, () => {
  console.log("server is running on the port", PORT);
});
