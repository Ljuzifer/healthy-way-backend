const { MethodWrapper, HttpError } = require("../helpers");
const LocaleDate = require("../helpers/LocaleDate");
const { User, Weight } = require("../models");

const updateWeight = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { weight } = req.body;

    const currentDate = LocaleDate();
    // const currentDate = Date.now();
    // const startTime = new Date(currentDate);
    // const endTime = new Date(currentDate);

    // startTime.setHours(0, 0, 0, 0);
    // endTime.setHours(23, 59, 59, 999);

    // const isWeightToday = await Weight.findOne({ owner, createdAt: { $gte: startTime, $lte: endTime } }).exec();
    const isWeightToday = await Weight.findOne({ owner, date: currentDate }).exec();

    if (!isWeightToday) {
        const newWeight = await Weight.create({ owner, weight });
        res.status(201).json(newWeight);
    } else {
        const updatedWeight = await Weight.findOneAndUpdate(
            { owner, date: currentDate },
            { weight },
            { new: true },
        ).exec();

        if (!updatedWeight) {
            throw HttpError(500, "Failed to update weight");
        }

        const user = await User.findByIdAndUpdate(owner, { weight }, { new: true }).exec();

        if (!user) {
            throw HttpError(404, "That user does not exists");
        }

        await user.save();

        res.status(200).json(updatedWeight);
    }
};

module.exports = {
    updateWeight: MethodWrapper(updateWeight),
};
