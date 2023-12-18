const { MethodWrapper, HttpError } = require("../helpers");
// const LocaleDate = require("../helpers/LocaleDate");
const Food = require("../models/food");

// const currentDate = LocaleDate();

const createFoodDiary = async (req, res) => {
    const { _id: owner } = req.user;
    const body = req.body;

    // const isExist = await Food.findOne({ owner, date: currentDate }).exec();
    // if (body.diary === isExist.diary) {
    //     throw HttpError(400, "Diary is already exist");
    // }

    const newDiary = await Food.create({ owner, ...body });

    res.status(201).json(newDiary);
};

const updateFoodDiary = async (req, res) => {
    const { foodId } = req.params;
    const body = req.body;

    const newDiary = await Food.findByIdAndUpdate(foodId, body, { new: true }).exec();

    if (!newDiary) {
        throw HttpError(404);
    }

    res.status(200).json(newDiary);
};

const deleteFoodDiary = async (req, res) => {
    const { foodId } = req.params;

    const delDiary = await Food.findByIdAndDelete(foodId, { new: true }).exec();

    if (!delDiary) {
        throw HttpError(404);
    }

    res.status(409).json({ message: "Removed successfull!" });
};

module.exports = {
    createFoodDiary: MethodWrapper(createFoodDiary),
    updateFoodDiary: MethodWrapper(updateFoodDiary),
    deleteFoodDiary: MethodWrapper(deleteFoodDiary),
};
