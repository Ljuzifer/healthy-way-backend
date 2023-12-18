const { Router } = require("express");
const { authentification } = require("../../middlewares");
const mode = require("../../controllers/statsProtocol");

const router = Router();

router.get("/", authentification, mode.getStatistics);

module.exports = router;
