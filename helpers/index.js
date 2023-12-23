const MethodWrapper = require("./MethodWrapper");
const HttpError = require("./HttpError");
const MongooseError = require("./MongooseError");
const IdentifyBMR = require("./IdentifyBMR");
const NeededWater = require("./NeededWater");
const { EmailSender, ForgotPassSender } = require("./EmailSender");
const LocaleDate = require("./LocaleDate");
const GenerateRandomPassword = require("./GeneratePass");

module.exports = {
    MethodWrapper,
    HttpError,
    MongooseError,
    IdentifyBMR,
    NeededWater,
    EmailSender,
    ForgotPassSender,
    LocaleDate,
    GenerateRandomPassword,
};
