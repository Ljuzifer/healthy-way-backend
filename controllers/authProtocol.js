const { User, Weight, Water } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");
const { HttpError, MethodWrapper, EmailSender } = require("../helpers");
const { error } = require("node:console");

const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = process.env;

// SignUp //
const registration = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (user) {
        throw HttpError(409, "This email is exist already");
    }

    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const verificationToken = crypto.randomUUID();

    const answer = await User.create({
        ...req.body,
        password: hashedPassword,
        verificationToken,
    });

    await Weight.create({
        weight: answer.weight,
        owner: answer._id,
    });

    await Water.create({
        water: 0,
        owner: answer._id,
    });

    await answer.save();

    await EmailSender(email, name, verificationToken);

    res.status(201).json({
        user: {
            name: answer.name,
            email: answer.email,
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
    const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, { expiresIn: "13m" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, { expiresIn: "13d" });
    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    res.json({
        accessToken,
        refreshToken,
        user: { name: user.name, email: user.email },
    });
}

async function logout(req, res) {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });

    res.status(204).json({
        message: "Logout successfull",
    });
}

async function refresh(req, res, next) {
    const { refreshToken: token } = req.body;

    try {
        const { id } = jwt.verify(token, JWT_REFRESH_KEY);
        const isExist = await User.findOne({ refreshToken: token });

        if (!isExist) {
            throw HttpError(403);
        }

        const payload = {
            id,
            name: isExist.name,
        };
        const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, { expiresIn: "13m" });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, { expiresIn: "13d" });

        res.json({ accessToken, refreshToken });
    } catch {
        throw HttpError(403, error.message);
    }
}

const removeUser = async (req, res) => {
    const { email, password } = req.body;
    const { _id } = req.user;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password are incorrect");
    }
    const userPassword = bcrypt.compareSync(password, user.password);
    if (!userPassword) {
        throw HttpError(401, "Email or password are incorrect");
    }

    const removedUser = await User.findByIdAndRemove(_id);
    if (!removedUser) {
        throw HttpError(404);
    }

    res.status(204).json({ message: "User credentials removed successfull!" });
};

module.exports = {
    registration: MethodWrapper(registration),
    confirmEmail: MethodWrapper(confirmEmail),
    resendConfirmEmail: MethodWrapper(resendConfirmEmail),
    login: MethodWrapper(login),
    logout: MethodWrapper(logout),
    refresh: MethodWrapper(refresh),
    removeUser: MethodWrapper(removeUser),
};
