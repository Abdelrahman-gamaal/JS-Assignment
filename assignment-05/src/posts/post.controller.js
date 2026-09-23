import { successResponse } from "../utils/response.js";

import {
  createPostService,
  deletePostService,
  allPostsService,
  postsWithCommentsCountService,
} from "./post.service.js";
export const createPostController = async (req, res) => {
  const result = await createPostService(req.body);
  successResponse(res, 201, "post created successfuly,", result);
};

export const deletePostController = async (req, res) => {
  const result = await deletePostService(req.params.id, req.body.userId);
  successResponse(res, 200, result.message, result.data);
};

export const allPostsController = async (req, res) => {
  const result = await allPostsService();
  successResponse(res, 200, "done", result);
};

export const postsWithCommentsCountController = async (req, res) => {
  const result = await postsWithCommentsCountService();

   successResponse(
    res,
    200,
    "done",
    result
  );
  
};