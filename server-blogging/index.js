import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import mongoose from "mongoose";
import { errorJson, successJson } from "./utils/JsonResponse.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// config
dotenv.config();

// DB Connection
const mongo_url = process.env.MONGO;
mongoose.connect(mongo_url).then(() => {
    console.log("Database Connected!");
});

const port = process.env.PORT;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// route middleware
app.use("/api", AuthRouter);

// test route
app.get("/test/success", async (req, res) => {
    res.json(successJson("Successful", { data: 1 }));
});

app.get("/test/error", (req, res) => {
    res.json(errorJson("Failed", { data: 0 }));
});

app.listen(port, () => {
    console.log(`API is running at port ${port}!`);
});
