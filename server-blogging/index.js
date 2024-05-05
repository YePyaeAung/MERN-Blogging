import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json("Testing");
});

app.listen(8888, () => {
    console.log("API is running at port 8888!");
});
