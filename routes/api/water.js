const { Router, json } = require("express");
const { JoiValidate, authentification } = require("../../middlewares");
const mode = require("../../controllers/waterProtocol");
const { waterSchema } = require("../../schemas/ValidationUser");

const router = Router();
const parseJSON = json();

router.get("/", authentification, mode.getWaterToday);

router.put("/", parseJSON, authentification, JoiValidate(waterSchema), mode.updateWater);

router.delete("/", authentification, mode.resetWaterToday);

module.exports = router;
