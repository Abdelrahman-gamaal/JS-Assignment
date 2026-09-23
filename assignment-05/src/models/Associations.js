import { user } from "./index.js";
import { post } from "./index.js";
import { comment } from "./index.js";
user.hasMany(post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
post.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

user.hasMany(comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
comment.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

post.hasMany(comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});
comment.belongsTo(post, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});
