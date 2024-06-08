import express from "express";
import {
    changePassword,
    checkAuth,
    login,
    logout,
    register,
    removeAccount,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/checkAuth", checkAuth);
router.post("/logout", logout);
router.post("/change-password", changePassword);
router.post("/delete-account", removeAccount);

export default router;
