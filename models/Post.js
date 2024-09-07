

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // Post title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Post content
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Foreign key reference to the user who created the post
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;

