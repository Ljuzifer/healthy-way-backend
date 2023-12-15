const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");

const recommendedSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    nutrition: {
        carbohydrates: {
            type: Number,
            required: true,
        },
        protein: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        },
    },
});

recommendedSchema.post("save", MongooseError);

const RecommendedFood = model("recommended-food", recommendedSchema);

module.exports = RecommendedFood;
