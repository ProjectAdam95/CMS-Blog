const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Define the Comment model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // Primary key for the comment
      autoIncrement: true,  // Auto-incrementing ID
    },
    comment_text: {
      type: DataTypes.TEXT,  // Store comment text
      allowNull: false,  // Comment cannot be empty
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',  // Reference to the 'users' table
        key: 'id',
      },
      onDelete: 'CASCADE',  // Delete comments if the associated user is deleted
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',  // Reference to the 'post' table
        key: 'id',
      },
      onDelete: 'CASCADE',  // Delete comments if the associated post is deleted
    },
  },
  {
    sequelize,  // Pass in the sequelize instance
    timestamps: true,  // Automatically include timestamp fields (createdAt, updatedAt)
    freezeTableName: true,  // Prevent Sequelize from renaming the table
    underscored: true,  // Use snake_case for field names
    modelName: 'comment',  // Name of the model
  }
);

module.exports = Comment;  // Export the Comment model




