const authRouter = require("./api/auth");
const goalRouter = require("./api/goal");
const weightRouter = require("./api/weight");
const waterRouter = require("./api/water");
const recommendedRouter = require("./api/recommended");

module.exports = {
    authRouter,
    goalRouter,
    weightRouter,
    waterRouter,
    recommendedRouter,
};
