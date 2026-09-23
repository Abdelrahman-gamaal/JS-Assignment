import { AppError } from "../error/AppError.js";
import { emailExistModel, createUserModel } from "./index.js";
import { hashPassword, matchPassword } from "../utils/bycrypt.js";
import { user } from "../models/index.js";

//============================
//==============================================================================
// sign up

export const signupService = async (data) => {
  // check if email is exist

  const result = await emailExistModel(data.email);
  if (result) {
    throw new AppError("email is already exist", 409);
  }
  // hashed password
  const password = await hashPassword(data.password);

  //data recording
  const user = {
    ...data,
    password: password,
  };

  await createUserModel(user);
  return user;
};
//==============================================================================

// sign in
export const signInService = async (email, password) => {
  // checl if email exist

  const user = await emailExistModel(email);
  if (!user) {
    throw new AppError("user is not found", 404);
  }
  // get hashed password from database  (done )
  // compare

  const isMatch = await matchPassword(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  return "success login";
};
//==============================================================================

// update or create data
export const upsertService = async (userId, data) => {
  try {
    const [result, created] = await user.upsert(
      {
        id: userId,
        email: data.email,
        name: data.name,
        age: data.age,
        role: data.role,
      },
      {
        validate: false,
      },
    );

    // inserted
    if (created) {
      return { message: "user created successfully", data: result };
    }
    return { message: "user updated successfully", data: result };
  } catch (error) {
    throw new AppError(error, 409);
  }
};
//==============================================================================

// search for user
export const searchService = async (data) => {
  // check if email is exist
  const result = await emailExistModel(data.email);
  if (!result) {
    throw new AppError("user is not exist", 404);
  }
  return result;
};
//==============================================================================

export const userService = async (userId) => {
  const result = await user.findByPk(userId);
  if (!result) {
    throw new AppError("user not found", 404);
  }
  return result.dataValues;
};
