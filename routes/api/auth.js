const { Router, json } = require("express");
const { JoiValidate, authentification } = require("../../middlewares");
const { registrationSchema, emailSchema, loginSchema, refreshSchema } = require("../../schemas/ValidationUser");
const mode = require("../../controllers/authProtocol");

const router = Router();
const parseJSON = json();

router.post("/registration", parseJSON, JoiValidate(registrationSchema), mode.registration);

router.get("/verify/:verificationToken", mode.confirmEmail);

router.post("/verify", parseJSON, JoiValidate(emailSchema), mode.resendConfirmEmail);

router.post("/login", parseJSON, JoiValidate(loginSchema), mode.login);

router.post("/logout", parseJSON, authentification, mode.logout);

router.post("/refresh", parseJSON, JoiValidate(refreshSchema), mode.refresh);

router.post("/forgot-password", parseJSON, JoiValidate(emailSchema), mode.forgotPassword);

router.delete("/delete", parseJSON, authentification, mode.removeUser);

module.exports = router;
