const { Router, json } = require("express");
const { JoiValidate } = require("../../middlewares");
const { registrationSchema, EmailSchema, LoginSchema } = require("../../schemas/ValidationUser");
const mode = require("../../controllers/authProtocol");
const authentification = require("../../middlewares/authentification");

const router = Router();
const parseJSON = json();

router.post("/registration", parseJSON, JoiValidate(registrationSchema), mode.registration);

router.get("/verify/:verificationToken", mode.confirmEmail);

router.post("/verify", parseJSON, JoiValidate(EmailSchema), mode.resendConfirmEmail);

router.post("/login", parseJSON, JoiValidate(LoginSchema), mode.login);

router.post("/logout", parseJSON, authentification, mode.logout);

router.get("/current", parseJSON, authentification, mode.current);

router.delete("/delete", parseJSON, authentification, mode.removeUser);

module.exports = router;
