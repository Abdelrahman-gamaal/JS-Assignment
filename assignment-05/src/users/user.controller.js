import { successResponse } from "../utils/response.js";
import {
  signupService,
  signInService,
  upsertService,
  searchService,
  userService,
} from "./index.js";
//==============================================
// sign up
//==============================================================================

export const signupController = async (req, res) => {
  const result = await signupService(req.body);
  return successResponse(res, 201, "user created successfuly", result);
};
//==============================================================================
// sign in
//==============================================================================

export const signInController = async (req, res) => {
  const message = await signInService(req.body.email, req.body.password);
  successResponse(res, 200, message);
};
//==============================================================================
// create or update user data
//==============================================================================

export const upsertUserController = async (req, res) => {
  const result = await upsertService(req.params.id, req.body);
  successResponse(res, 200, result.message, result.data);
};

//==============================================================================
// search for user by email
//==============================================================================

export const searchController = async (req, res) => {
  const result = await searchService(req.query);
  successResponse(res, 200, "done", result);
};
//==============================================================================
//search for user by id
//==============================================================================

export const userController = async (req, res) => {
  const result = await userService(req.params.id);
  successResponse(res, 200, "done", result);
};
//==============================================================================
