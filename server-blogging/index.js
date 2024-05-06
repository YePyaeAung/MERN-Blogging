import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import mongoose from "mongoose";

const app = express();

// config
dotenv.config();

// DB Connection
const mongo_url = process.env.MONGO;
mongoose.connect(mongo_url).then(() => {
    console.log("Database Connected!");
});

const port = process.env.PORT;

// route middleware
app.use("/api", AuthRouter); // 1

app.listen(port, () => {
    console.log(`API is running at port ${port}!`);
});
