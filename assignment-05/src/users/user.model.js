import { user } from "../models/index.js";
import { AppError } from "../error/AppError.js";
//==============================================================================

// check if email is exist in DB
export const emailExistModel = async (email) => {
  const result = await user.findOne({
    where: {
      email: email,
    },
  });
  return result;
};

export const createUserModel = async (data) => {
  try {
    await user.create(data);
  } catch (error) {
    throw new AppError(error, 500);
  }
};
