const { Router, json } = require("express");
const { authentification, JoiValidate } = require("../../middlewares");
const mode = require("../../controllers/weightProtocol");
const { weightSchema } = require("../../schemas/ValidationUser");

const router = Router();
const parseJSON = json();

router.put("/", parseJSON, authentification, JoiValidate(weightSchema), mode.updateWeight);

module.exports = router;
