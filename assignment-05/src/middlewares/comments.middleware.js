import { AppError } from "../error/AppError.js";
import {
  commentSchema,
  findOrCreateCommentSchema,
} from "../comments/comments.validation.js";
export const commentsValidationMiddleware = async (req, res, next) => {
  const { error, value } = commentSchema.validate(req.body);

  if (error) {
    throw new AppError(error, 400);
  }
  console.log(value);
  req.body = value;

  next();
};
export const findOrCreateCommentMiddleware = async (req, res, next) => {
  const { error, value } = findOrCreateCommentSchema.validate(req.body);

  if (error) {
    throw new AppError(error, 400);
  }
  console.log(value);
  req.body = value;

  next();
};
