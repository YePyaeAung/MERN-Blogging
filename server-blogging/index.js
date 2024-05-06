import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";

const app = express();

// config
dotenv.config();

const port = process.env.PORT;

// route middleware
app.use("/api", AuthRouter); // 1

app.listen(port, () => {
    console.log(`API is running at port ${port}!`);
});
