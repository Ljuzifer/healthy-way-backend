const { HttpError, MethodWrapper } = require("../helpers");
const { LocaleDate } = require("../helpers");
const { Water, Weight, Food } = require("../models");

async function getStatistics(req, res, next) {
    const { _id: owner } = req.user;
    const { period, month, quantity } = req.query;

    const currentDate = new Date(Date.now());

    if (period === "today") {
        const beginDate = new Date(currentDate);
        const endDate = new Date(currentDate);

        beginDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        const today = LocaleDate();

        const water = await Water.find({ owner, date: today }, "-_id -owner -updatedAt").exec();
        const weight = await Weight.find({ owner, date: today }, "-_id -owner -updatedAt").exec();
        const todayDiary = await Food.aggregate([
            {
                $match: { owner, date: today, diary: { $in: ["Breakfast", "Dinner", "Lunch", "Snack"] } },
            },
            {
                $facet: {
                    Breakfast: [
                        { $match: { diary: "Breakfast" } },
                        {
                            $group: {
                                _id: null,
                                protein: { $sum: "$protein" },
                                fat: { $sum: "$fat" },
                                carbohydrate: { $sum: "$carbohydrate" },
                            },
                        },
                    ],
                    Dinner: [
                        { $match: { diary: "Dinner" } },
                        {
                            $group: {
                                _id: null,
                                protein: { $sum: "$protein" },
                                fat: { $sum: "$fat" },
                                carbohydrate: { $sum: "$carbohydrate" },
                            },
                        },
                    ],
                    Lunch: [
                        { $match: { diary: "Lunch" } },
                        {
                            $group: {
                                _id: null,
                                protein: { $sum: "$protein" },
                                fat: { $sum: "$fat" },
                                carbohydrate: { $sum: "$carbohydrate" },
                            },
                        },
                    ],
                    Snack: [
                        { $match: { diary: "Snack" } },
                        {
                            $group: {
                                _id: null,
                                protein: { $sum: "$protein" },
                                fat: { $sum: "$fat" },
                                carbohydrate: { $sum: "$carbohydrate" },
                            },
                        },
                    ],
                },
            },
        ]).exec();

        res.json({
            water,
            weight,
            // food,
            todayDiary,
        });

        return;
    }

    if (period === "month" && month) {
        const monthNumber = parseInt(month, 10);

        if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ message: "Invalid month number" });
        }

        const beginDateMonth = new Date(currentDate.getFullYear(), monthNumber - 1, 1, 3);

        const endDateMonth = new Date(new Date(beginDateMonth).setMonth(new Date(beginDateMonth).getMonth() + 1));

        const caloriesByDays = await Food.aggregate([
            { $match: { owner, createdAt: { $gte: beginDateMonth, $lt: endDateMonth } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%d", date: "$createdAt" } },
                    fat: { $sum: "$fat" },
                    protein: { $sum: "$protein" },
                    carbohydrate: { $sum: "$carbohydrate" },
                    total: { $sum: "$total" },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        const waterByDays = await Water.aggregate([
            { $match: { owner, createdAt: { $gte: beginDateMonth, $lt: endDateMonth } } },
            { $group: { _id: { $dateToString: { format: "%d", date: "$createdAt" } }, total: { $sum: "$water" } } },
            { $sort: { _id: 1 } },
        ]).exec();

        const weightByDays = await Weight.aggregate([
            { $match: { owner, createdAt: { $gte: beginDateMonth, $lt: endDateMonth } } },
            { $group: { _id: { $dateToString: { format: "%d", date: "$createdAt" } }, total: { $sum: "$weight" } } },
            { $sort: { _id: 1 } },
        ]).exec();

        res.json({
            water: waterByDays,
            weight: weightByDays,
            calories: caloriesByDays,
        });

        return;
    }

    if (period === "month" && quantity) {
        const monthsNumber = parseInt(quantity, 10);

        if (isNaN(monthsNumber) || monthsNumber < 1) {
            return res.status(400).json({ message: "Invalid number of months. Please provide a positive integer." });
        }

        const beginDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - monthsNumber + 1, 1, 3);
        const endDate = new Date(new Date(beginDate).setMonth(new Date(beginDate).getMonth() + monthsNumber));

        const caloriesByDays = await Food.aggregate([
            { $match: { owner, createdAt: { $gte: beginDate, $lt: endDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    fat: { $sum: "$fat" },
                    protein: { $sum: "$protein" },
                    carbohydrate: { $sum: "$carbohydrate" },
                    total: { $sum: "$total" },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        const waterByDays = await Water.aggregate([
            { $match: { owner, createdAt: { $gte: beginDate, $lt: endDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    total: { $sum: "$water" },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        const weightByDays = await Weight.aggregate([
            { $match: { owner, createdAt: { $gte: beginDate, $lt: endDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    total: { $sum: "$weight" },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        res.json({
            water: waterByDays,
            weight: weightByDays,
            calories: caloriesByDays,
        });

        return;
    }

    if (period === "year") {
        const beginDateYear = new Date(Number(currentDate.getFullYear() - 1), Number(currentDate.getMonth()), 1, 3);
        const endDateYear = new Date(new Date(currentDate));

        const waterByMonths = await Water.aggregate([
            { $match: { owner, createdAt: { $gte: beginDateYear, $lt: endDateYear } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    total: { $sum: "$water" },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        const weightByMonths = await Weight.aggregate([
            { $match: { owner, createdAt: { $gte: beginDateYear, $lt: endDateYear } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    total: { $sum: "$weight" },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        const caloriesByMonths = await Food.aggregate([
            { $match: { owner, createdAt: { $gte: beginDateYear, $lt: endDateYear } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    fat: { $sum: "$fat" },
                    protein: { $sum: "$protein" },
                    carbohydrate: { $sum: "$carbohydrate" },
                    total: { $sum: "$total" },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        res.json({
            water: waterByMonths,
            weight: weightByMonths,
            calories: caloriesByMonths,
        });

        return;
    }

    throw HttpError(404, "Not found");
}

module.exports = {
    getStatistics: MethodWrapper(getStatistics),
};
