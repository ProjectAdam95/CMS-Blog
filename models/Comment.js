const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // Correct table name is 'users'
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',  // Assuming your 'post' table is named 'post'
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;



