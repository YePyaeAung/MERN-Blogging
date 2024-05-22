import express from "express";
import { getTagsAndLanguages } from "../controllers/ArticleController.js";

const router = express.Router();

router.get("/tags-languages", getTagsAndLanguages);

export default router;
