import { user } from "../models/index.js";
import { successResponse } from "../utils/response.js";
import {
  signupService,
  signInService,
  upsertService,
  searchService,
  userService,
} from "./user.service.js";
// sign up
export const signupController = async (req, res) => {
  //req.body right validation  name email password role
  // c check email is exist or know
  // will change
  const result = await signupService(req.body);
  return successResponse(res, 201, "user created successfuly", result);
};

// sign in

export const signInController = async (req, res) => {
  const message = await signInService(req.body.email, req.body.password);
  successResponse(res, 200, message);
};
// create or update user data
export const upsertUserController = async (req, res) => {
  let userId = req.params.id;
  const result = await upsertService(userId, req.body);
  successResponse(res, 200, result.message, result.data);
};

export const searchController = async (req, res) => {
  const result = await searchService(req.query);
  successResponse(res, 200, "done", result);
};

export const userController = async (req, res) => {
  const result = await userService(req.params.id);
  successResponse(res, 200, "done", result);
};
