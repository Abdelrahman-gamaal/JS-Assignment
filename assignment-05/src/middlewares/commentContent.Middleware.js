import { AppError } from "../error/AppError.js";
import { commentContentSchema } from "../comments/comments.validation.js";

export const commentContentMiddleware = (req, res, next) => {
  const { error, value } = commentContentSchema.validate(req.body);
  if (error) {
    throw new AppError(error, 400);
  }
  req.body = value;
  next();
};
