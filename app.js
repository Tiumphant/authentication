import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import authRutes from "./routes/userRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRutes);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
