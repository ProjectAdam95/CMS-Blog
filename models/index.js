// Filename: models/index.js

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User can have many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',  
});

// Post belongs to a User
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',  
});

// Post can have many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',  // If a post is deleted, its comments are also deleted
});

// Comment belongs to a User (the one who made the comment)
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',  // If a user is deleted, their comments are also deleted
});

// Comment belongs to a Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',  // If a post is deleted, the comments on it are also deleted
});

module.exports = { User, Post, Comment };

