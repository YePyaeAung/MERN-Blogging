import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import ArticleRouter from "./routes/ArticleRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import ProfileRouter from "./routes/ProfileRouter.js";
import DataRouter from "./routes/DataRouter.js";
import CommentRouter from "./routes/CommentRouter.js";
import ArticleCommentModel from "./models/ArticleCommentModel.js";
import ArticleLikeRouter from "./routes/ArticleLikeRouter.js";
import ArticleModel from "./models/ArticleModel.js";

const app = express();

// config
dotenv.config();

// DB Connection
const mongo_url = process.env.MONGO;
(async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("Database Connected!");
    } catch (error) {
        console.log(error.message);
    }
})();

const port = process.env.PORT;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(fileUpload());
app.use(express.static("public"));

// route middleware
app.use("/api", AuthRouter);
app.use("/api/auth/article", ArticleRouter);
app.use("/api/auth", ProfileRouter);
app.use("/api", DataRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/auth/article", ArticleLikeRouter);

// test route
app.get("/article/test", async (req, res) => {
    const data = await ArticleModel.updateMany(
        {},
        { user: "6662dd294e14cb619ce6b93d" }
    );
    const article_user = await ArticleModel.find().populate("user", "name");
    return res.json(article_user);
});

app.listen(port, () => {
    console.log(`API is running at port ${port}!`);
});
