import express from "express";
import { login } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/login", login); // 2

export default router;
