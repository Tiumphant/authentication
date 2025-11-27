import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, unique: true },
  refreshToken: { type: String },
});

export const User = mongoose.model("User", userSchema);
