import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import mongoose from "mongoose";
import UserModel from "./models/UserModel.js";

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
app.use("/api", AuthRouter);

// test route
app.get("/test", async (req, res) => {
    // const createData = await UserModel.create({
    //     name: "test",
    //     email: "test@gmail.com",
    //     password: "password",
    // });
    // res.json(createData);

    const users = await UserModel.find();
    res.json(users);
});

app.listen(port, () => {
    console.log(`API is running at port ${port}!`);
});
