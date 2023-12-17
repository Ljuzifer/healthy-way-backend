const { MethodWrapper, HttpError } = require("../helpers");
const LocaleDate = require("../helpers/LocaleDate");
const Food = require("../models/food");

const createFoodDiary = async (req, res) => {
    const { _id: owner } = req.user;
    const body = req.body;

    const currentDate = LocaleDate();

    const isExist = await Food.findOne({ owner, date: currentDate }).exec();
    if (body.diary === isExist.diary) {
        throw HttpError(400, "Diary is already exist");
    }

    const newDiary = await Food.create({ owner, ...body });

    res.status(201).json(newDiary);
};

const updateFoodDiary = async (req, res) => {};

module.exports = {
    createFoodDiary: MethodWrapper(createFoodDiary),
    updateFoodDiary: MethodWrapper(updateFoodDiary),
};
