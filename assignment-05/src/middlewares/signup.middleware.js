import { AppError } from "../error/AppError.js";
import { signupSchema } from "../users/user.validation.js";

export const signupMiddleware = (req, res, next) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    throw new AppError(error, 400);
  }
  req.body = value;
  next();
};
