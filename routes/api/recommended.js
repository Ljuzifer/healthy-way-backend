const { Router, json } = require("express");
const mode = require("../../controllers/recommendedProtocol");

const router = Router();
const parseJSON = json();

router.get("/", parseJSON, mode.getAllRecommended);

module.exports = router;
