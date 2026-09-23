import { successResponse } from "../utils/response.js";

import {
  createPostService,
  deletePostService,
  allPostsService,
  postsWithCommentsCountService,
} from "./index.js";
//==============================================================================

// create post 
//==============================================================================
export const createPostController = async (req, res) => {
  const result = await createPostService(req.body);
  successResponse(res, 201, "post created successfuly,", result);
};
//==============================================================================
//delete post
//==============================================================================
export const deletePostController = async (req, res) => {
  const result = await deletePostService(req.params.id, req.body.userId);
  successResponse(res, 200, result.message, result.data);
};
//============================================================================== 
// retreive all post 
//==============================================================================
export const allPostsController = async (req, res) => {
  const result = await allPostsService();
  successResponse(res, 200, "done", result);
};
//==============================================================================
// post and count comment on it 
//==============================================================================
export const postsWithCommentsCountController = async (req, res) => {
  const result = await postsWithCommentsCountService();

  successResponse(res, 200, "done", result);
};

//==============================================================================