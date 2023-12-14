const Joi = require("joi");

const registerationSchema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(16),
    goal: Joi.string().valid("Lose fat", "Maintain", "Gain Muscle"),
    gender: Joi.string().valid("Male", "Female"),
    age: Joi.number().integer(),
    height: Joi.number().min(140).max(240),
    weight: Joi.number().min(40).max(220),
    activityRatio: Joi.number().min(1.2).max(2.5),
});

module.exports = {
    registerationSchema,
};
