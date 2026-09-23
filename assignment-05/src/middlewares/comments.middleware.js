import { AppError } from "../error/AppError.js";

import {
  commentSchema,
  findOrCreateCommentSchema,
  commentContentSchema,
} from "../comments/index.js";

//==================================

// comment validation

export const commentsValidationMiddleware = async (req, res, next) => {
  const { error, value } = commentSchema.validate(req.body);

  if (error) {
    throw new AppError(error, 400);
  }
  console.log(value);
  req.body = value;

  next();
};

//=================================================================
// find or create comment

export const findOrCreateCommentMiddleware = async (req, res, next) => {
  const { error, value } = findOrCreateCommentSchema.validate(req.body);

  if (error) {
    throw new AppError(error, 400);
  }
  console.log(value);
  req.body = value;

  next();
};

//=================================================================

// validation on content of comment

export const commentContentMiddleware = (req, res, next) => {
  const { error, value } = commentContentSchema.validate(req.body);
  if (error) {
    throw new AppError(error, 400);
  }
  req.body = value;
  next();
};

//=================================================================
