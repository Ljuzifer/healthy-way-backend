const { Router, json } = require("express");
const { authentification, JoiValidate } = require("../../middlewares");
const mode = require("../../controllers/foodProtocol");
const { createDiarySchema, updateDiarySchema } = require("../../schemas/ValidationUser");

const router = Router();
const parseJSON = json();

router.post("/", parseJSON, authentification, JoiValidate(createDiarySchema), mode.createFoodDiary);

router.put("/:foodId", parseJSON, authentification, JoiValidate(updateDiarySchema), mode.updateFoodDiary);

module.exports = router;
