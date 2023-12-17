const { Router, json } = require("express");
const { authentification, JoiValidate } = require("../../middlewares");
const mode = require("../../controllers/userProtocol");
const { userUpdateSchema } = require("../../schemas/ValidationUser");

const router = Router();
const parseJSON = json();

router.get("/current", authentification, mode.getCurrentUser);

router.put("/update", parseJSON, authentification, JoiValidate(userUpdateSchema), mode.updateCurrentUser);

module.exports = router;
