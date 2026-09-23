import express from "express";

import { errorMiddleware } from "./middlewares/Error.middleware.js";
import { sequelize, check_db } from "./config/database.js";
import "./models/Associations.js";

//=======================================================
// import routes
import userRouter from "./users/user.routes.js";
import postRouter from "./posts/post.routes.js";
import commentRouter from "./comments/comment.routes.js";

//=======================================================

const app = express();
app.use(express.json());

await sequelize.sync();
//===========================================
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
//==============================================

// middleware error

app.use(errorMiddleware);

await check_db();
export default app;
