import joi from "joi";

export const postSchema = joi.object({
  title: joi.string().min(3).max(100).required(),

  content: joi.string().min(10).required(),

  userId: joi.number().integer().positive().required(),
});
