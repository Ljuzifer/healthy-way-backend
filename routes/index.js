const authRouter = require("./api/auth");
const userRouter = require("./api/user");
const goalRouter = require("./api/goal");
const weightRouter = require("./api/weight");
const waterRouter = require("./api/water");
const foodRouter = require("./api/food");
const recommendedRouter = require("./api/recommended");
const statsRouter = require("./api/statistics");

module.exports = {
    authRouter,
    userRouter,
    goalRouter,
    weightRouter,
    waterRouter,
    foodRouter,
    recommendedRouter,
    statsRouter,
};
