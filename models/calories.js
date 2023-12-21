const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");
const Food = require("./food");

const caloriesSchema = Schema(
    {
        calories: {
            type: Number,
            default: 0,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        date: {
            type: String,
        },
    },
    { versionKey: false, timestamps: true },
);

caloriesSchema.pre("save", async function (next) {
    try {
        const { owner, date } = this;

        // Отримуємо всі записи з їжі для поточного користувача та вказаної дати
        const foodEntries = await Food.find({ owner, date });

        // Підраховуємо загальну суму калорій для отриманих записів
        const totalCaloriesToday = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);

        // Оновлюємо поле caloriesToday
        this.caloriesToday = totalCaloriesToday;

        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
});

caloriesSchema.post("save", MongooseError);

const Calories = model("calories", caloriesSchema);

module.exports = Calories;
