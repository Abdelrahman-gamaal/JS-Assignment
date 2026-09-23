import express from "express";
import { errorMiddleware } from "./middlewares/Error.middleware.js";
import { AppError } from "./error/AppError.js";
import { successResponse } from "./utils/response.js";
import { user, comment, post } from "./models/index.js";
import { sequelize, check_db } from "./config/database.js";
import "./models/Associations.js";
import userRouter from "./users/user.routes.js";
import postRouter from "./posts/post.routes.js";
import commentRouter from "./comments/comment.routes.js";
const app = express();
app.use(express.json());

await sequelize.sync();
//===========================================
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
//==============================================
app.use(errorMiddleware);

await check_db();
export default app;
