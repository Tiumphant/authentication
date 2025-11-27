import express from "express";
import { register, Login, refreshToken } from "../controller/userController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.post("/refresh-token", authMiddleware, refreshToken);
export default router;
