import { AppError } from "../error/AppError.js";
import { signupSchema, signInSchema, emailSchema } from "../users/index.js";

// signup middleware
//===========================================================

export const signupMiddleware = (req, res, next) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    throw new AppError(error, 400);
  }
  req.body = value;
  next();
};

//===========================================================

//sign in middleware
export const signInMiddleware = (req, res, next) => {
  const { error, value } = signInSchema.validate(req.body);
  if (error) {
    throw new AppError(error, 400);
  }
  req.body = value;
  next();
};

//===========================================================

// email middleware

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
//===========================================================
