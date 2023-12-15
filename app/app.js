const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { HttpError } = require("../helpers/HttpError");
require("dotenv").config();
const multer = require("multer");

// const { authRouter, contactsRouter } = require("./routes/api");
const { authRouter, goalRouter, recommendedRouter } = require("../routes");
// const { recommendedRouter } = require("../routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
// app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/user/goal", goalRouter);
app.use("/api/user/recommended-food", recommendedRouter);
// app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.message === "Unexpected field" || err.field !== "avatar") {
            next(HttpError(400, "Field must be named -> avatar"));
        }
    }
    res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
