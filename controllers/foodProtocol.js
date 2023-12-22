const { MethodWrapper, HttpError } = require("../helpers");
const LocaleDate = require("../helpers/LocaleDate");
const Food = require("../models/food");

const currentDate = LocaleDate();

const getFoodDiaryToday = async (req, res) => {
    const { _id: owner } = req.user;

    const isFood = await Food.find({ owner }).exec();

    if (!isFood) {
        throw HttpError(404);
    }

    const isDiaryToday = isFood.filter((post) => post.date === currentDate);

    if (!isDiaryToday) {
        throw HttpError(404, "There are no food in diary today");
    }

    const diaryData = {
        breakfast: [],
        dinner: [],
        lunch: [],
        snack: [],
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
    };

    isDiaryToday.forEach((el) => {
        const obj = {
            diary: el.diary,
            name: el.name,
            id: el._id,
            fat: el.fat,
            protein: el.protein,
            carbohydrate: el.carbohydrate,
            calories: el.calories,
        };

        switch (el.diary) {
            case "Breakfast":
            case "Dinner":
            case "Lunch":
            case "Snack":
                diaryData[el.diary.toLowerCase()].push(obj);
                diaryData.protein += el.protein;
                diaryData.fat += el.fat;
                diaryData.carbohydrate += el.carbohydrate;
                diaryData.calories += el.calories;
                break;
        }
    });

    res.status(200).json(diaryData);
};

const createFoodDiary = async (req, res) => {
    const { _id: owner } = req.user;
    const body = req.body;

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

const getCalorieToday = async (req, res) => {};

module.exports = {
    getFoodDiaryToday: MethodWrapper(getFoodDiaryToday),
    createFoodDiary: MethodWrapper(createFoodDiary),
    updateFoodDiary: MethodWrapper(updateFoodDiary),
    deleteFoodDiary: MethodWrapper(deleteFoodDiary),
    getCalorieToday: MethodWrapper(getCalorieToday),
};
