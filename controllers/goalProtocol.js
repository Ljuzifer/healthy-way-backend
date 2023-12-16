const { MethodWrapper, HttpError } = require("../helpers");
const { User } = require("../models");

const updateUserGoal = async (req, res) => {
    const { _id: owner } = req.user;
    const { goal } = req.body;

    const user = await User.findByIdAndUpdate(owner, { goal }, { new: true }).exec();

    if (!user) {
        throw HttpError(404, "That user not found...");
    }

    await user.save();

    res.status(201).json({
        goal: user.goal,
    });
};

module.exports = {
    updateUserGoal: MethodWrapper(updateUserGoal),
};
