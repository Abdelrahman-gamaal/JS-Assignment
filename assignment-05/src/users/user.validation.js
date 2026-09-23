import joi from "joi";

export const signupSchema = joi.object({
  name: joi
    .string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),

  email: joi.string().trim().max(100).email().required(),
  password: joi.string().min(6).max(100).required(),
  age: joi.number().integer().min(18).max(100).required(),
  role: joi.string().valid("admin", "user").default("user"),
});

export const signInSchema = joi.object({
  email: joi.string().trim().max(100).email().required(),
  password: joi.string().min(6).max(100).required(),
});

export const emailSchema = joi.object({
  email: joi.string().trim().max(100).email().required(),
});
