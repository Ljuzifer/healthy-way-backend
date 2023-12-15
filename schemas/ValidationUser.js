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

const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
});

const EmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = {
    registrationSchema,
    LoginSchema,
    EmailSchema,
};
