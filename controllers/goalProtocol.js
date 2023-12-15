const { MethodWrapper, HttpError } = require("../helpers");
const { User } = require("../models");

const updateUserGoal = async (req, res) => {
    const { _id } = req.user;
    const { goal } = req.body;

    const user = await User.findByIdAndUpdate(_id, { goal }, { new: true }).exec();

    if (!user) {
        throw HttpError(404, "That user not found...");
    }

    await user.save();

    res.status(200).json({
        goal: user.goal,
    });
};

module.exports = {
    updateUserGoal: MethodWrapper(updateUserGoal),
};
