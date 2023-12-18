const Joi = require("joi");

const registrationSchema = Joi.object({
    name: Joi.string().min(2).required().messages({ "any.required": "Enter your name please" }),
    email: Joi.string().email().required().messages({ "any.required": "Enter your email please" }),
    password: Joi.string().min(6).max(16).required().messages({ "any.required": "Enter your password please" }),
    goal: Joi.string()
        .valid("Lose fat", "Maintain", "Gain muscle")
        .required()
        .messages({ "any.required": "Choose your goal please" }),
    gender: Joi.string().valid("Male", "Female").required().messages({ "any.required": "Choose your gender please" }),
    age: Joi.number().integer().required().messages({ "any.required": "Enter your age please" }),
    height: Joi.number().min(140).max(240).required().messages({ "any.required": "Enter your height please" }),
    weight: Joi.number().min(40).max(220).required().messages({ "any.required": "Enter your weight please" }),
    activityRatio: Joi.number()
        .valid(1.2, 1.375, 1.55, 1.725, 1.9)
        .required()
        .messages({ "any.required": "Choose your phisical activity please" }),
});

const userUpdateSchema = Joi.object({
    name: Joi.string().min(2),
    gender: Joi.string().valid("Male", "Female"),
    age: Joi.number().integer(),
    height: Joi.number().min(140).max(240),
    weight: Joi.number().integer(),
    activityRatio: Joi.number().valid(1.2, 1.375, 1.55, 1.725, 1.9),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Enter your email please" }),
    password: Joi.string().min(6).max(16).required().messages({ "any.required": "Enter your password please" }),
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

const createDiarySchema = Joi.object({
    diary: Joi.string().valid("Breakfast", "Lunch", "Dinner", "Snack").required(),
    name: Joi.string().required().messages({ "any.required": "Enter your nosh name please" }),
    carbohydrate: Joi.number().required().messages({ "any.required": "Enter your carbohydrate please" }),
    protein: Joi.number().required().messages({ "any.required": "Enter your protein please" }),
    fat: Joi.number().required().messages({ "any.required": "Enter your fat please" }),
});

const updateDiarySchema = Joi.object({
    diary: Joi.string().valid("Breakfast", "Lunch", "Dinner", "Snack"),
    name: Joi.string(),
    carbohydrate: Joi.number(),
    protein: Joi.number(),
    fat: Joi.number(),
});

module.exports = {
    registrationSchema,
    userUpdateSchema,
    loginSchema,
    emailSchema,
    goalSchema,
    weightSchema,
    waterSchema,
    createDiarySchema,
    updateDiarySchema,
};
