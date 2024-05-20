import express from "express";
import { checkAuth, login, register } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/checkAuth", checkAuth);

export default router;
