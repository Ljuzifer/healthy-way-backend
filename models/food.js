const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");
const LocaleDate = require("../helpers/LocaleDate");

// const diarySchema = new Schema({
//     dishes: [
//         {
//             name: "breakfast",
//             ratio: [
//                 {
//                     name: "Салат",
//                     carbonohidrates: 10,
//                     protein: 10,
//                     fat: 10,
//                     calories: 10,
//                 },
//             ],
//         },

//         {
//             name: "lunch",
//             ratio: [
//                 {
//                     name: "Салат",
//                     carbonohidrates: 10,
//                     protein: 10,
//                     fat: 10,
//                     calories: 10,
//                 },
//             ],
//         },

//         {
//             name: "dinner",
//             ratio: [
//                 {
//                     name: "Салат",
//                     carbonohidrates: 10,
//                     protein: 10,
//                     fat: 10,
//                     calories: 10,
//                 },
//             ],
//         },

//         {
//             name: "snack",
//             ratio: [
//                 {
//                     name: "Салат",
//                     carbonohidrates: 10,
//                     protein: 10,
//                     fat: 10,
//                     calories: 10,
//                 },
//             ],
//         },
//     ],

//     amount: [
//         {
//             name: "calories",
//             total: 20,
//         },

//         {
//             name: "carbonohidrates",
//             total: 20,
//         },
//         {
//             name: "protein",
//             total: 20,
//         },
//         {
//             name: "fat",
//             total: 20,
//         },
//     ],
// });

const foodSchema = new Schema(
    {
        diary: {
            type: String,
            enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
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
        total: {
            type: Number,
            default: function () {
                return this.fat + this.protein + this.carbohydrate;
            },
            required: true,
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
