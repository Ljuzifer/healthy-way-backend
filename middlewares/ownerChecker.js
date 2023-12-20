const { HttpError } = require("../helpers");
const Food = require("../models/food");

const ownerChecker = async (req, res, next) => {
    try {
        const { foodId } = req.params;
        const { _id } = req.user;
        const answer = await Food.findById(foodId).exec();

        if (answer.owner.toString() !== _id.toString()) {
            throw HttpError(404);
        }

        next();
    } catch {
        next(HttpError(404));
    }
};

module.exports = ownerChecker;
