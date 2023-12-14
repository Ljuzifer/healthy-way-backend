const User = require("../models/user");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("node:crypto");
const { HttpError, MethodWrapper } = require("../helpers");

// const { JWT_SECRET_KEY } = process.env;

const registration = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (user) {
        throw HttpError(409, "This email is exist already");
    }

    // const createBMR = IdentifyBMR(gender, age, height, weight, activityRatio);
    // console.log(createBMR);

    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const answer = await User.create({
        ...req.body,
        password: hashedPassword,
        // BMR: createBMR,
    });
    await answer.save();

    // await EmailSender(email, verificationToken);

    res.status(201).json({
        user: {
            name: answer.name,
            email: answer.email,
            // goal: answer.goal,
            // gender: answer.gender,
            // age: answer.age,
            // height: answer.height,
            // weight: answer.weight,
            // activityRatio: answer.activityRatio,
            // avatarURL: answer.avatarURL,
            // BMR: answer.BMR,
        },
    });
};

module.exports = {
    registration: MethodWrapper(registration),
};
