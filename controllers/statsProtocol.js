// const { Water } = require("../models/water");
// const { Food } = require("../models/food");
// const { Weight } = require("../models/weight");
// const { HttpError, MethodWrapper } = require("../helpers");

const { HttpError, MethodWrapper } = require("../helpers");
const { LocaleDate } = require("../helpers");
const { Water, Weight, Food } = require("../models");

async function getStatistics(req, res, next) {
    const { _id: owner } = req.user;
    const { period, month } = req.query;
    const currentDate = new Date(Date.now());
    // const currentDate = LocaleDate();

    if (period === "today") {
        const beginDate = new Date(currentDate);
        const endDate = new Date(currentDate);

        beginDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        const today = LocaleDate();

        const water = await Water.find({ owner, date: today }, "-_id -owner -updatedAt").exec();
        const weight = await Weight.find({ owner, date: today }, "-_id -owner -updatedAt").exec();
        // const food = await Food.find({ owner, date: today }, "-owner -createdAt -updatedAt").exec();

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
        // const beginDateMonth = new Date(Number(currentDate.getFullYear()), Number(currentDate.getMonth()), 1, 0);
        // const endDateMonth = new Date(new Date(beginDateMonth).setMonth(new Date(beginDateMonth).getMonth() + 1));
        // console.log(beginDateMonth);
        // console.log(endDateMonth);

        // const caloriesByDays = await Food.aggregate([
        //     {
        //         $match: {
        //             owner,
        //             date: {
        //                 $gte: beginDateMonth.toISOString().split("T")[0],
        //                 $lt: endDateMonth.toISOString().split("T")[0],
        //             },
        //         },
        //     },
        //     { $group: { _id: { $dateToString: { format: "%d", date: "$date" } }, amount: { $sum: "$total" } } },
        //     { $sort: { _id: 1 } },
        // ]).exec();

        // const waterByDays = await Water.aggregate([
        //     {
        //         $match: {
        //             owner,
        //             date: {
        //                 $gte: beginDateMonth.toISOString().split("T")[0],
        //                 $lt: endDateMonth.toISOString().split("T")[0],
        //             },
        //         },
        //     },
        //     { $group: { _id: { $dateToString: { format: "%d", date: "$date" } }, amount: { $sum: "$water" } } },
        //     { $sort: { _id: 1 } },
        // ]).exec();

        // const weightByDays = await Weight.aggregate([
        //     {
        //         $match: {
        //             owner,
        //             date: {
        //                 $gte: beginDateMonth.toISOString().split("T")[0],
        //                 $lt: endDateMonth.toISOString().split("T")[0],
        //             },
        //         },
        //     },
        //     { $group: { _id: { $dateToString: { format: "%d", date: "$date" } }, amount: { $sum: "$weight" } } },
        //     { $sort: { _id: 1 } },
        // ]).exec();

        // res.json({
        //     water: waterByDays,
        //     weight: weightByDays,
        //     calories: caloriesByDays,
        // });

        // const beginDateMonth = new Date(Number(currentDate.getFullYear()), Number(currentDate.getMonth()), 1, 3);
        // const endDateMonth = new Date(new Date(beginDateMonth).setMonth(new Date(beginDateMonth).getMonth() + 1));

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
            { $group: { _id: { $dateToString: { format: "%d", date: "$createdAt" } }, amount: { $sum: "$water" } } },
            { $sort: { _id: 1 } },
        ]).exec();

        const weightByDays = await Weight.aggregate([
            { $match: { owner, createdAt: { $gte: beginDateMonth, $lt: endDateMonth } } },
            { $group: { _id: { $dateToString: { format: "%d", date: "$createdAt" } }, amount: { $sum: "$weight" } } },
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

        console.log(beginDateYear);
        console.log(endDateYear);

        const caloriesByMonths = await Food.aggregate([
            {
                $match: {
                    owner,
                    date: {
                        $gte: beginDateYear.toISOString().split("T")[0],
                        $lt: endDateYear.toISOString().split("T")[0],
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    amount: { $sum: "$calories" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        const waterByMonths = await Water.aggregate([
            {
                $match: {
                    owner,
                    date: {
                        $gte: beginDateYear.toISOString().split("T")[0],
                        $lt: endDateYear.toISOString().split("T")[0],
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    amount: { $sum: "$water" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]).exec();

        const weightByMonths = await Weight.aggregate([
            {
                $match: {
                    owner,
                    date: {
                        $gte: beginDateYear.toISOString().split("T")[0],
                        $lt: endDateYear.toISOString().split("T")[0],
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    amount: { $sum: "$weight" },
                    count: { $sum: 1 },
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
