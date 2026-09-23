import { AppError } from "../error/AppError.js";
import { postSchema } from "../posts/index.js";

// middleware validation on post request

export const postMiddleware = async (req, res, next) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) {
    throw new AppError(error, 400);
  }
  req.body = value;

  next();
};
