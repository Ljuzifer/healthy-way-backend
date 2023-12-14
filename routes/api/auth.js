const { Router, json } = require("express");
const { JoiValidate } = require("../../middlewares");
const { registrationSchema, EmailSchema, LoginSchema } = require("../../schemas/ValidationUser");
const mode = require("../../controllers/authProtocol");

const router = Router();
const parseJSON = json();

router.post("/registration", parseJSON, JoiValidate(registrationSchema), mode.registration);

router.get("/verify/:verificationToken", mode.confirmEmail);

router.post("/verify", parseJSON, JoiValidate(EmailSchema), mode.resendConfirmEmail);

router.post("/login", parseJSON, JoiValidate(LoginSchema), mode.login);

module.exports = router;
