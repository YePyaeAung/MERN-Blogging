import express from "express";
import {
    all,
    destroy,
    edit,
    getTagsAndLanguages,
    show,
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
router.get("/:slug", show);
router.get("/edit/:slug", edit);
router.post("/update/:slug", update);
router.delete("/:slug", destroy);

export default router;
