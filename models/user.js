const { Schema, model } = require("mongoose");
const { MongooseError, IdentifyBMR, NeededWater } = require("../helpers");
const gravatar = require("gravatar");
const LocaleDate = require("../helpers/LocaleDate");
const IdentifyMacros = require("../helpers/IdentifyMacros");

const GOAL = ["Lose fat", "Maintain", "Gain muscle"];
const GENDER = ["Male", "Female"];
const ACTIVITY = [1.2, 1.375, 1.55, 1.725, 1.9];

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

        avatarURL: {
            type: String,
            required: true,
            default: function () {
                return gravatar.url(this.email, { s: "250" }, true);
            },
        },
        goal: {
            type: String,
            enum: GOAL,
            required: true,
        },
        gender: {
            type: String,
            enum: GENDER,
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
            enam: ACTIVITY,
            required: true,
        },
        BMR: {
            type: Number,
        },
        fat: {
            type: Number,
        },
        protein: {
            type: Number,
        },
        carbohydrate: {
            type: Number,
        },
        baseWater: {
            type: Number,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            default: "",
        },
        accessToken: {
            type: String,
            default: "",
        },
        refreshToken: {
            type: String,
            default: "",
        },
        date: {
            type: String,
            require: true,
            default: () => LocaleDate(),
        },
    },
    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

userSchema.pre("save", function (next) {
    const { gender, height, weight, age, activityRatio, goal } = this;
    this.BMR = IdentifyBMR({ gender, height, weight, age, activityRatio });
    const bmr = this.BMR;

    const macros = IdentifyMacros(goal, bmr);

    this.baseWater = NeededWater(weight, activityRatio);

    this.fat = macros.fat;
    this.protein = macros.protein;
    this.carbohydrate = macros.carbohydrate;

    next();
});

userSchema.post("save", MongooseError);

const User = model("user", userSchema);

module.exports = User;
