import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    console.log("incomming body", req.body);
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "user already registered " });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All the field are required " });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    console.log(user);
    return res.status(200).json({ message: "Registeted successfully", user });
  } catch (err) {
    console.log("regirsted error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "incorrect password" });
    }
    const token = generateToken(user);
    user.refreshToken = token.refreshToken;
    await user.save();
    res.json({
      message: "Login succesd",
      accessToken: token.accesToken,
      refreshToken: token.refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: "internal server eroro" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    console.log("refresh token incomeing", req.body);
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "no refresh token is aavialbe" });
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "forbidden" });

        const { accesToken, refreshToken: newRefreshToken } =
          generateToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({ accesToken, refreshToken: newRefreshToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};
