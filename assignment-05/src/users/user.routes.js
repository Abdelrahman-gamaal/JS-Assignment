import express from "express";
import { signupMiddleware } from "../middlewares/signup.middleware.js";
import { signInMiddleware } from "../middlewares/signIn.middleware.js";
import { emailMiddleware } from "../middlewares/email.middleware.js";
import {
  signupController,
  signInController,
  upsertUserController,
  searchController,
  userController,
} from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", signupMiddleware, signupController);
userRouter.post("/signin", signInMiddleware, signInController);
userRouter.put("/:id", upsertUserController);
userRouter.get("/search", emailMiddleware, searchController);
userRouter.get("/user/:id", userController);
export default userRouter;
