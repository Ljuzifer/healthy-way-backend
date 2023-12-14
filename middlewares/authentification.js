const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HttpError } = require("../helpers");

const { JWT_SECRET_KEY } = process.env;

const authentification = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const tokenArr = authorization.split(" ");
    const [bearer, token] = tokenArr;

    if (bearer !== "Bearer") {
        next(HttpError(401));
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET_KEY);
        const isUser = await User.findById(id);

        if (!isUser || !isUser.token || isUser.token !== token) {
            next(HttpError(401));
        }
        req.user = isUser;

        next();
    } catch {
        next(HttpError(401));
    }
};

module.exports = authentification;
