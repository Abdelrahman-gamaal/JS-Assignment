import { AppError } from "../error/AppError.js";
import { postSchema } from "../posts/post.validation.js";
export const postMiddleware = async (req, res, next) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) {
    throw new AppError(error, 400);
  }
  req.body = value;

  next();
};
