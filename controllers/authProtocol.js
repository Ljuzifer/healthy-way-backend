const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");
const { HttpError, MethodWrapper, EmailSender } = require("../helpers");

const { JWT_SECRET_KEY } = process.env;

// SignUp //
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
    const verificationToken = crypto.randomUUID();

    const answer = await User.create({
        ...req.body,
        password: hashedPassword,
        verificationToken,
    });
    await answer.save();

    await EmailSender(email, verificationToken);

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

// Mail Confirm //
async function confirmEmail(req, res) {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw HttpError(404, "User not found or email was confirmed already");
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });

    res.json({ message: "Email was confirm successfull!" });
}

async function resendConfirmEmail(req, res) {
    console.log(req.body);
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(404, "User not found...");
    }

    if (user.verify) {
        throw HttpError(400, "This email is verified already!");
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });

    await EmailSender(email, user.verificationToken);

    res.json({ message: "Email was confirmed successfull!" });
}

// signin //
async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password are incorrect");
    }

    if (!user.verify) {
        throw HttpError(401, "Sorry, your email is not verified...");
    }

    const userPassword = bcrypt.compareSync(password, user.password);
    if (!userPassword) {
        throw HttpError(401, "Email or password are incorrect");
    }

    const payload = {
        id: user._id,
        name: user.name,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "5w" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: { name: user.name, email: user.email },
    });
}

async function logout(req, res) {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json({
        message: "Logout successfull",
    });
}

async function current(req, res) {
    const { email, subscription } = req.user;

    res.json({ email, subscription });
}

module.exports = {
    registration: MethodWrapper(registration),
    confirmEmail: MethodWrapper(confirmEmail),
    resendConfirmEmail: MethodWrapper(resendConfirmEmail),
    login: MethodWrapper(login),
};
