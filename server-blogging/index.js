import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("Testing");
});

app.listen(8888, () => {
    console.log("API is running at port 8888!");
});
