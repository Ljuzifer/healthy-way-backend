const { Router, json } = require("express");
const authentification = require("../../middlewares/authentification");
const mode = require("../../controllers/goalProtocol");

const router = Router();
const parseJSON = json();

router.put("/", parseJSON, authentification, mode.updateUserGoal);

module.exports = router;
