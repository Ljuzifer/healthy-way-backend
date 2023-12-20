const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { foodId } = req.params;
  if (!isValidObjectId(foodId)) {
    next(HttpError(404, `${foodId} is no valid!`));
  }
  next();
};

module.exports = isValidId;
