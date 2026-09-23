import express from "express";
import { postMiddleware } from "../middlewares/post.middleware.js";
import {
  createPostController,
  deletePostController,
  allPostsController,
  postsWithCommentsCountController,
} from "./index.js";

//==============================================================================

const postRouter = express.Router();

postRouter.post("/create", postMiddleware, createPostController);
postRouter.delete("/delete/:id", deletePostController);
postRouter.get("/details", allPostsController);
postRouter.get("/comment-count", postsWithCommentsCountController);
export default postRouter;
