const { MethodWrapper, HttpError } = require("../helpers");
const LocaleDate = require("../helpers/LocaleDate");
const { Water } = require("../models");

const currentDate = LocaleDate();

const getWaterToday = async (req, res) => {
    const { _id: owner } = req.user;

    const waterLevel = await Water.findOne({ owner, date: currentDate }).exec();

    if (!waterLevel) {
        throw HttpError(404, `You didn't enter water today...:(`);
    }

    res.status(200).json(waterLevel);
};

const updateWater = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { water } = req.body;

    const isWaterToday = await Water.findOne({ owner, date: currentDate }).exec();

    if (!isWaterToday) {
        const drunkWater = await Water.create({ owner, water });

        res.status(201).json({
            water: drunkWater.water,
        });
    } else {
        const { _id, water: consumed } = isWaterToday;
        const updatedWater = await Water.findOneAndUpdate(
            { _id, date: currentDate },
            { water: water + consumed },
            { new: true },
        ).exec();

        if (!updatedWater) {
            throw HttpError(500, "Failed to update water");
        }

        res.status(200).json(updatedWater);
    }
};

const resetWaterToday = async (req, res) => {
    const { _id: owner } = req.user;

    // const waterLevel = await Water.findOne({ owner, createdAt: { $gte: startTime, $lte: endTime } }).exec();
    const waterLevel = await Water.findOne({ owner, date: currentDate }).exec();

    if (!waterLevel) {
        throw HttpError(404, `You didn't enter water today...:(`);
    }

    const { _id } = waterLevel;
    const level = await Water.findByIdAndUpdate({ _id, date: currentDate }, { water: 0 }, { new: true }).exec();

    res.status(200).json({
        owner: level._id,
        water: level.water,
    });
};

module.exports = {
    getWaterToday: MethodWrapper(getWaterToday),
    updateWater: MethodWrapper(updateWater),
    resetWaterToday: MethodWrapper(resetWaterToday),
};
