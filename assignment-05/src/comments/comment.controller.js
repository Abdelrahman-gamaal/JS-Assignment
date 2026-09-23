import { successResponse } from "../utils/response.js";
import {
  addCommentService,
  updateCommentService,
  findOrCreateCommentService,
  searchCommentsByWordService,
  recentCommentsService,
  spicificCommentService,
} from "./index.js";

//=======================================================
// add comment
//=======================================================

export const addCommentController = async (req, res) => {
  const result = await addCommentService(req.body);
  successResponse(res, 201, result.message, result.data);
};
//=======================================================
// update comment
//=======================================================

export const updateCommentController = async (req, res) => {
  const result = await updateCommentService(req.params.id, req.body);
  successResponse(res, 200, result.message, result.data);
};
//=======================================================
// find comment
//=======================================================

export const findCommentController = async (req, res) => {
  const result = await findOrCreateCommentService(req.body);
  successResponse(res, result.statusCode, result.message, result.data);
};

//=======================================================

// search about comment by a word
//=======================================================

export const searchCommentsByWordController = async (req, res) => {
  const result = await searchCommentsByWordService(req.query.word);
  successResponse(res, 200, "done", result.data);
};
//=======================================================
// retreive comment by id
//=======================================================

export const recentCommentsController = async (req, res) => {
  const result = await recentCommentsService(Number(req.params.id));
  console.log(1);
  successResponse(res, 200, "done", result);
};

//=======================================================
//retreive specific comment

export const spicificCommentController = async (req, res) => {
  const result = await spicificCommentService(Number(req.params.id));
  successResponse(res, 200, "done", result);
};
//=======================================================
