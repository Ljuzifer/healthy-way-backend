const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");
const LocaleDate = require("../helpers/LocaleDate");

const DIARY = ["Breakfast", "Lunch", "Dinner", "Snack"];

const foodSchema = new Schema(
    {
        diary: {
            type: String,
            enum: DIARY,
            required: true,
        },
        name: {
            type: String,
            required: [true, "Nosh name is required"],
        },
        carbohydrate: {
            type: Number,
            default: 0,
            required: [true, "Carbohydrate is required"],
        },
        protein: {
            type: Number,
            default: 0,
            required: [true, "Protein is required"],
        },
        fat: {
            type: Number,
            default: 0,
            required: [true, "Fat is required"],
        },
        calories: {
            type: Number,
            default: 0,
            required: [true, "Calories is required"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
        date: {
            type: String,
            require: true,
            default: () => LocaleDate(),
        },
    },

    { versionKey: false, timestamps: true },
);

foodSchema.post("save", MongooseError);

const Food = model("food", foodSchema);

module.exports = Food;
