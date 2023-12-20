const { Router, json } = require("express");
const { authentification, JoiValidate, isValidId, ownerChecker } = require("../../middlewares");
const mode = require("../../controllers/foodProtocol");
const { createDiarySchema, updateDiarySchema } = require("../../schemas/ValidationUser");

const router = Router();
const parseJSON = json();

router.get("/", authentification, mode.getFoodDiaryToday);

router.post("/", parseJSON, authentification, JoiValidate(createDiarySchema), mode.createFoodDiary);

router.put(
    "/:foodId",
    parseJSON,
    authentification,
    isValidId,
    ownerChecker,
    JoiValidate(updateDiarySchema),
    mode.updateFoodDiary,
);

router.delete("/:foodId", authentification, isValidId, ownerChecker, mode.deleteFoodDiary);

module.exports = router;
