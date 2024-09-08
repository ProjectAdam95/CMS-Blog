const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

// Use comment routes for '/comments' path
router.use('/comments', commentRoutes);

// Use post routes for '/posts' path
router.use('/posts', postRoutes);

// Use user routes for '/users' path
router.use('/users', userRoutes);

module.exports = router;  // Export the combined router
