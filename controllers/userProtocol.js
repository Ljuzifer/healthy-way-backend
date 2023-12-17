const { MethodWrapper, HttpError } = require("../helpers");
const { User } = require("../models");

const getCurrentUser = async (req, res) => {
    const user = req.user;

    if (!user) {
        throw HttpError(404);
    }

    res.status(200).json({
        data: {
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            height: user.height,
            weight: user.weight,
            goal: user.goal,
            baseWater: user.baseWater,
            activityRatio: user.activityRatio,
            fat: user.fat,
            protein: user.protein,
            carbohydrate: user.carbohydrate,
            BMR: user.BMR,
            avatarURL: user.avatarURL,
        },
    });
};

const updateCurrentUser = async (req, res) => {
    const { _id: owner } = req.user;
    const { body } = req;

    const answer = await User.findByIdAndUpdate(owner, { ...body }, { new: true });

    if (!answer) {
        throw HttpError(404);
    }

    await answer.save();

    res.status(200).json({
        data: {
            name: answer.name,
            age: answer.age,
            gender: answer.gender,
            height: answer.height,
            activityRatio: answer.activityRatio,
        },
        message: "Updated successfull!",
    });
};

module.exports = {
    getCurrentUser: MethodWrapper(getCurrentUser),
    updateCurrentUser: MethodWrapper(updateCurrentUser),
};
