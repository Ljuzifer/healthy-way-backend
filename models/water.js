const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");

const waterSchema = new Schema(
    {
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
