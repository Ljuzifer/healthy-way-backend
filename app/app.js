const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { HttpError } = require("../helpers/HttpError");
const multer = require("multer");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("../swagger.json");
const parseJSON = express.json();

const {
    authRouter,
    goalRouter,
    weightRouter,
    waterRouter,
    recommendedRouter,
    userRouter,
    foodRouter,
    statsRouter,
} = require("../routes");

const swaggerOptions = {
    swaggerOptions: {
        docExpansion: "none",
    },
};

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

app.use("/api-skeleton", parseJSON, swaggerUI.serve, swaggerUI.setup(swaggerFile, swaggerOptions));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/user/goal", goalRouter);
app.use("/api/user/weight", weightRouter);
app.use("/api/user/water", waterRouter);
app.use("/api/user/food", foodRouter);
app.use("/api/user/recommended-food", recommendedRouter);
app.use("/api/user/statistics", statsRouter);

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
