import express from "express";
const commentRouter = express.Router();
//=======================================================
// middleware
//=======================================================

import {
  commentsValidationMiddleware,
  findOrCreateCommentMiddleware,
  commentContentMiddleware,
} from "../middlewares/comments.middleware.js";
//=======================================================
//controller
//=======================================================

import {
  addCommentController,
  updateCommentController,
  findCommentController,
  searchCommentsByWordController,
  recentCommentsController,
  spicificCommentController,
} from "./index.js";

//================================
// route
//=======================================================

commentRouter.post("/", commentsValidationMiddleware, addCommentController);
commentRouter.patch("/:id", commentContentMiddleware, updateCommentController);
commentRouter.post(
  "/find-or-create/",
  findOrCreateCommentMiddleware,
  findCommentController,
);
commentRouter.get("/search", searchCommentsByWordController);
commentRouter.get("/newest/:id", recentCommentsController);
commentRouter.get("/details/:id", spicificCommentController);
export default commentRouter;

//=======================================================
