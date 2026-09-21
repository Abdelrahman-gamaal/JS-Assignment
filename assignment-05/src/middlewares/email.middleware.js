import { AppError } from "../error/AppError.js";
import { emailSchema } from "../users/user.validation.js";

export const emailMiddleware = (req, res, next) => {
  const email = { email: req.query.email };

  const { error, value } = emailSchema.validate(email);
  if (error) {
    throw new AppError(error, 400);
  }
  console.log(value);

  console.log(value);
  console.log(req.query);
  next();
};
