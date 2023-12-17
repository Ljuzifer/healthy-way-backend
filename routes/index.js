const authRouter = require("./api/auth");
const userRouter = require("./api/user");
const goalRouter = require("./api/goal");
const weightRouter = require("./api/weight");
const waterRouter = require("./api/water");
const recommendedRouter = require("./api/recommended");

module.exports = {
    authRouter,
    userRouter,
    goalRouter,
    weightRouter,
    waterRouter,
    recommendedRouter,
};
