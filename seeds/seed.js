const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// Sample user data to seed the database
const userData = [
  {
    username: 'JohnDoe',
    password: 'password123',  // In a real app, ensure passwords are hashed
  },
];

// Sample post data to seed the database
const postData = [
  {
    title: 'Tech Blog Post 1',
    content: 'This is a sample post about tech!',
    user_id: 1,  // Foreign key referencing the user
  },
];

// Sample comment data to seed the database
const commentData = [
  {
    comment_text: 'Great post!',
    user_id: 1,  // Foreign key referencing the user
    post_id: 1,  // Foreign key referencing the post
  },
];

// Function to seed the database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });  // Sync models and force database reset

  // Create users in bulk with individualHooks for hashing passwords
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,  // Return created data
  });

  // Create posts and comments in bulk
  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);  // Exit process once seeding is done
};

// Call the function to seed the database
seedDatabase();
