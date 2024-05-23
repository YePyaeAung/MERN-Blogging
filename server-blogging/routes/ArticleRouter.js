import express from "express";
import {
    all,
    destroy,
    getTagsAndLanguages,
    store,
    update,
} from "../controllers/ArticleController.js";
import CheckAuth from "../middleware/CheckAuth.js";

const router = express.Router();

// middleware
router.use(CheckAuth);

router.get("/tags-languages", getTagsAndLanguages);
router.post("/", store);
router.get("/", all);
router.put("/:slug", update);
router.delete("/:slug", destroy);

export default router;
