import { successResponse } from "../utils/response.js";
import {
  addCommentService,
  updateCommentService,
  findOrCreateCommentService,
  searchCommentsByWordService,
  recentCommentsService,
  spicificCommentService
} from "./comment.service.js";

export const addCommentController = async (req, res) => {
  const result = await addCommentService(req.body);
  successResponse(res, 201, result.message, result.data);
};
export const updateCommentController = async (req, res) => {
  const result = await updateCommentService(req.params.id, req.body);
  successResponse(res, 200, result.message, result.data);
};

export const findCommentController = async (req, res) => {
  const result = await findOrCreateCommentService(req.body);
  successResponse(res, result.statusCode, result.message, result.data);
};

export const searchCommentsByWordController = async (req, res) => {
  const result = await searchCommentsByWordService(req.query.word);

  successResponse(res, 200, "done", result.data);
};
export const recentCommentsController = async (req, res) => {
  const result = await recentCommentsService(Number(req.params.id));
  console.log(1);
  successResponse(res, 200, "done", result);
};

export const spicificCommentController=async(req,res)=>{
  const result =await spicificCommentService(Number(req.params.id))
  successResponse(res,200,'done',result)
}
