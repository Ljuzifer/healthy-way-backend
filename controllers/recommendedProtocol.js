const { MethodWrapper, HttpError } = require("../helpers");
const { RecommendedFood } = require("../models");

const getAllRecommended = async (req, res, next) => {
    const recommended = await RecommendedFood.find().exec();

    if (!recommended) {
        throw HttpError(404);
    }

    res.status(200).json(recommended);
};

module.exports = {
    getAllRecommended: MethodWrapper(getAllRecommended),
};
