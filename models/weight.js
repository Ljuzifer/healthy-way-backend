const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");
const LocaleDate = require("../helpers/LocaleDate");

const weightSchema = new Schema(
    {
        date: {
            type: String,
            require: true,
            default: () => LocaleDate(),
        },
        weight: {
            type: Number,
            require: [true, "Enter your weight please"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
    },
    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

weightSchema.post("seve", MongooseError);

const Weight = model("weight", weightSchema);

module.exports = Weight;
