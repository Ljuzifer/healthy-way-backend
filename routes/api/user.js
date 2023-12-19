const { Router, json } = require("express");
const { authentification, JoiValidate } = require("../../middlewares");
const mode = require("../../controllers/userProtocol");
const { userUpdateSchema } = require("../../schemas/ValidationUser");
const downloadAVA = require("../../middlewares/downloadAVA");

const router = Router();
const parseJSON = json();

router.get("/current", authentification, mode.getCurrentUser);

router.put("/update", parseJSON, authentification, JoiValidate(userUpdateSchema), mode.updateCurrentUser);

router.post("/load-avatar", authentification, downloadAVA.single("avatar"), mode.uploadAvatar);

module.exports = router;
