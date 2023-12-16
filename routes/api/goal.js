const { Router, json } = require("express");
const { authentification, JoiValidate } = require("../../middlewares");
const mode = require("../../controllers/goalProtocol");
const { goalSchema } = require("../../schemas/ValidationUser");

const router = Router();
const parseJSON = json();

router.put("/", parseJSON, JoiValidate(goalSchema), authentification, mode.updateUserGoal);

module.exports = router;
