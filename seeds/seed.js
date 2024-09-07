const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'JohnDoe',
    password: 'password123',
  },
];

const postData = [
  {
    title: 'Tech Blog Post 1',
    content: 'This is a sample post about tech!',
    user_id: 1,
  },
];

const commentData = [
  {
    comment_text: 'Great post!',
    user_id: 1,
    post_id: 1,
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
