import joi from "joi";

export const commentSchema = joi.array().items(
  joi.object({
    content: joi.string().min(1).required(),
    postId: joi.number().integer().positive().required(),
    userId: joi.number().integer().positive().required(),
  }),
);

export const commentContentSchema = joi.object({
  content: joi.string().min(1).required(),
  userId: joi.number().integer().positive().required(),
});

export const findOrCreateCommentSchema = joi.object({
  content: joi.string().min(1).required(),
  postId: joi.number().integer().positive().required(),
  userId: joi.number().integer().positive().required(),
});
