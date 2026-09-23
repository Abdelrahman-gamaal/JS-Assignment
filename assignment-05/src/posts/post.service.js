import { user, post, comment } from "../models/index.js";
import { AppError } from "../error/AppError.js";
import { fn, col } from "sequelize";

//=========================================================

// create post
//==============================================================================

export const createPostService = async (data) => {
  //check if user exist
  const result = await user.findByPk(data.userId);
  if (!result) {
    throw new AppError("user not found", 404);
  }

  const Post = await post.create(data);
  console.log(1);
  return await post.findOne({
    where: {
      title: data.title,
      userId: data.userId,
    },
  });
};

//==============================================================================
// delete post
//==============================================================================

export const deletePostService = async (postId, userId) => {
  // check if post exist

  const Post = await post.findByPk(userId);
  if (!Post) {
    throw new AppError("post not found", 404);
  }

  // check if user is the owner of the post
  if (userId !== Post.userId) {
    throw new AppError("You are not the owner of this post", 403);
  }

  // delete post
  await Post.destroy();
  return {
    message: "post deletd successfuly",
    data: Post,
  };
};
//==============================================================================
// get all post
//==============================================================================

export const allPostsService = async () => {
  const result = await post.findAll({
    include: [
      {
        model: user,
      },
      {
        model: comment,
      },
    ],
  });
  if (!result) {
    throw new AppError("no post found", 404);
  }
  return result;
};
//==============================================================================
// post and count the comment on it
//==============================================================================

export const postsWithCommentsCountService = async () => {
  return await post.findAll({
    attributes: [
      "id",
      "title",
      [fn("COUNT", col("comments.id")), "commentsCount"],
    ],
    include: [
      {
        model: comment,
        attributes: [],
      },
    ],
    group: ["post.id"],
  });
};

//==============================================================================
