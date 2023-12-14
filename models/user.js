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
        fat: {
            type: Number,
        },
        protein: {
            type: Number,
        },
        carbohydrate: {
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
    },
    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

userSchema.pre("save", function (next) {
    const { gender, height, weight, age, activityRatio, goal } = this;
    this.BMR = IdentifyBMR({ gender, height, weight, age, activityRatio });

    let proteinPercentage, fatPercentage;

    switch (goal) {
        case "Lose fat":
            proteinPercentage = 0.25;
            fatPercentage = 0.2;
            break;
        case "Gain Muscle":
            proteinPercentage = 0.3;
            fatPercentage = 0.2;
            break;
        case "Maintain":
            proteinPercentage = 0.2;
            fatPercentage = 0.25;
            break;
        default:
            proteinPercentage = 0.25;
            fatPercentage = 0.2;
    }

    const carbPercentage = 1 - (proteinPercentage + fatPercentage);

    const protein = Math.round((proteinPercentage * this.BMR) / 4);
    const fat = Math.round((fatPercentage * this.BMR) / 9);
    const carbohydrate = Math.round((carbPercentage * this.BMR) / 4);

    this.fat = fat;
    this.protein = protein;
    this.carbohydrate = carbohydrate;

    next();
});

userSchema.post("save", MongooseError);

const User = model("user", userSchema);

module.exports = User;
