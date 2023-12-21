const { MethodWrapper, HttpError } = require("../helpers");
const fs = require("node:fs/promises");
const { User } = require("../models");
const uploadCloud = require("../helpers/uploadCloud");

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
            weight: answer.weight,
            activityRatio: answer.activityRatio,
        },
        message: "Updated successfull!",
    });
};

async function uploadAvatar(req, res) {
    if (!req.file) {
        throw HttpError(400, "Avatar must be provided");
    }

    const { _id } = req.user;

    const avatarURL = await uploadCloud(req.file.path);
    if (!avatarURL) {
        throw HttpError(500, `Error uploading avatar to File Server, ${avatarURL}`);
    }

    await fs.unlink(req.file.path);

    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true }).exec();

    res.json({ avatarURL });
}

module.exports = {
    getCurrentUser: MethodWrapper(getCurrentUser),
    updateCurrentUser: MethodWrapper(updateCurrentUser),
    uploadAvatar: MethodWrapper(uploadAvatar),
};
