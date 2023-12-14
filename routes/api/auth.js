const { Router, json } = require("express");
const { JoiValidate } = require("../../middlewares");
const { registrationSchema } = require("../../schemas/ValidationUser");
const mode = require("../../controllers/authProtocol");

const router = Router();
const parseJSON = json();

router.post("/signup", parseJSON, JoiValidate(registrationSchema), mode.registration);

module.exports = router;
