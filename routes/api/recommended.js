const { Router, json } = require("express");
const mode = require("../../controllers/recommendedProtocol");
const { authentification } = require("../../middlewares");

const router = Router();
const parseJSON = json();

router.get("/", parseJSON, authentification, mode.getAllRecommended);

module.exports = router;
