import express from "express";
import dotenv from "dotenv";

const app = express();

// config
dotenv.config();

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.json("Testing");
});

app.listen(port, () => {
    console.log(`API is running at port ${port}!`);
});
