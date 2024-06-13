import express from "express";
import DataController from "../controllers/DataController.js";

const router = express.Router();

router.get("/get-tags-langs", DataController.getTagsLangs);

export default router;
