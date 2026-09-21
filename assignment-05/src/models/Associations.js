import { user } from "./index.js";
import { post } from "./index.js";
import { comment } from "./index.js";
user.hasMany(post, {
  foreignKey: "userId",
});
post.belongsTo(user, {
  foreignKey: "userId",
  
});

user.hasMany(comment, {
  foreignKey: "userId",
});
comment.belongsTo(user, {
  foreignKey: "userId",

});

post.hasMany(comment, {
  foreignKey: "postId",
});
comment.belongsTo(post, {
  foreignKey: "postId",
  
});
