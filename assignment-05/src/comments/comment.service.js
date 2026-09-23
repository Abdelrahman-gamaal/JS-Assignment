import { Op } from "sequelize";
import { AppError } from "../error/AppError.js";
import { user, post, comment } from "../models/index.js";

export const addCommentService = async (data) => {
  //checl if post id is exist
  console.log(data);
  for (const item of data) {
    console.log(item.postId);
    const Post = await post.findByPk(item.postId);
    console.log(Post);
    if (!Post) {
      throw new AppError("post not found", 404);
    }
  }
  for (const item of data) {
    const User = await user.findByPk(item.userId);
    if (!User) {
      throw new AppError("user not found", 404);
    }
  }
  const Comment = await comment.bulkCreate(data);
  return {
    message: "comments add successfuly",
    data: Comment,
  };
};
//comment id  userID post Id

export const updateCommentService = async (commentId, data) => {
  //check if comment id is exist
  const commentFound = await comment.findByPk(commentId);
  if (!commentFound) {
    throw new AppError("comment not found", 404);
  }
  if (commentFound.userId !== data.userId) {
    throw new AppError("You are not the owner of this comment", 403);
  }
  const afterUpdate = await commentFound.update({
    content: data.content,
  });
  return {
    message: "comment update successfuly",
    data: afterUpdate,
  };
};
//=========================================================
export const findOrCreateCommentService = async (data) => {
  //check if user and post exist

  const userFound = await user.findByPk(data.userId);
  if (!userFound) {
    throw new AppError("user not found", 404);
  }

  const postFound = await post.findByPk(data.postId);
  if (!postFound) {
    throw new AppError("post not found", 404);
  }
  //check if comment exist by contetn userId postID

  const commentFound = await comment.findOne({
    where: {
      content: data.content,
      userId: data.userId,
      postId: data.postId,
    },
  });

  if (commentFound) {
    return {
      data: commentFound,
      message: "created : false",
      statusCode: 200,
    };
  }
  // if not create comment
  const newComment = await comment.create(data);
  return {
    data: newComment,
    message: "created : true",
    statusCode: 201,
  };
};

//==========================================================
export const searchCommentsByWordService = async (word) => {
  // find comment match this word
  // count comment match this word

  const CommentsMatch = await comment.findAll({
    attributes: ["content"],
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });

  console.log(CommentsMatch);
  if (CommentsMatch.length === 0) {
    throw new AppError("no Comments found", 400);
  }

  const count = await comment.count({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });
  return {
    data: {
      count: count,
      CommentsMatch,
    },
  };
};

//========================

export const recentCommentsService = async (id) => {
  console.log(1);
  const Post = await post.findByPk(id);
  if (!Post) {
    throw new AppError("no post found", 404);
  }
  const Comments = await comment.findAll({
    attributes: ["content"],
    where: {
      postId: id,
    },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
  console.log(2);
  if (Comments.length === 0) {
    throw new AppError("no comment found", 404);
  }
  return Comments;
};

//=======================================

export const spicificCommentService = async (commentId) => {
  const result = await comment.findByPk(commentId, {
    include: [
      {
        model: user,
      },
      {
        model: post,
      },
    ],
  });
  if (!result) {
    throw new AppError("comment not exist", 404);
  }

  return result;
};
