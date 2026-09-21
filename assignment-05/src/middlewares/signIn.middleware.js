import { AppError } from "../error/AppError.js";
import { signInSchema } from "../users/user.validation.js";

export const signInMiddleware = (req, res, next) => {
  const { error, value } = signInSchema.validate(req.body);
  if (error) {
    throw new AppError(error, 400);
  }
  req.body = value;
  next();
};
