const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");
const LocaleDate = require("../helpers/LocaleDate");

const waterSchema = new Schema(
    {
        date: {
            type: String,
            require: true,
            default: () => LocaleDate(),
        },
        water: {
            type: Number,
            // default: 0,
            require: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

waterSchema.post("save", MongooseError);

const Water = model("water", waterSchema);

module.exports = Water;
