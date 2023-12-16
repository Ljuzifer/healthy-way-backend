const Joi = require("joi");

const registrationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
    goal: Joi.string().valid("Lose fat", "Maintain", "Gain muscle").required(),
    gender: Joi.string().valid("Male", "Female").required(),
    age: Joi.number().integer().required(),
    height: Joi.number().min(140).max(240).required(),
    weight: Joi.number().min(40).max(220).required(),
    activityRatio: Joi.number().valid(1.2, 1.375, 1.55, 1.725, 1.9).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

const goalSchema = Joi.object({
    goal: Joi.string()
        .valid("Lose fat", "Maintain", "Gain muscle")
        .required()
        .messages({ "any.required": "Enter your goal please" }),
});

const weightSchema = Joi.object({
    weight: Joi.number().required().messages({ "any.required": "Enter your weight please" }),
});

const waterSchema = Joi.object({
    water: Joi.number().unit("milliliters").required().messages({ "any.required": "Enter your water please" }),
});

module.exports = {
    registrationSchema,
    loginSchema,
    emailSchema,
    goalSchema,
    weightSchema,
    waterSchema,
};
