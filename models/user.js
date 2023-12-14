const { Schema, model } = require("mongoose");
const { MongooseError, IdentifyBMR } = require("../helpers");
const gravatar = require("gravatar");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            index: true,
            unique: true,
        },
        password: {
            type: String,
            minLength: [6, "Password must be minimum of six symbols"],
            required: [true, "Password is required"],
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            required: true,
            default: function () {
                return gravatar.url(this.email, { s: "250" }, true);
            },
        },
        goal: {
            type: String,
            enum: ["Lose fat", "Maintain", "Gain Muscle"],
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        activityRatio: {
            type: Number,
            required: true,
            min: 1.2,
            max: 2.5,
        },
        BMR: {
            type: Number,
        },
    },
    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

userSchema.pre("save", (next) => {
    const { gender, height, weight, age, activityRatio } = this;
    this.BMR = IdentifyBMR({ gender, height, weight, age, activityRatio });
    next();
});

userSchema.post("save", MongooseError);

const User = model("user", userSchema);

module.exports = User;
