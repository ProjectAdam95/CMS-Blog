const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Home route - Display all posts
router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    
    const posts = postsData.map(post => post.get({ plain: true }));

    // Render the home page, passing posts and the login status
    res.render('home', { title: 'Home Page', posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Something went wrong. Please try again later.' });
  }
});

// Post detail route - Display single post with comments
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });

    if (!postData) {
      return res.status(404).render('error', { message: 'Post not found' });
    }

    const post = postData.get({ plain: true });

    // Render the post detail page
    res.render('post', { title: `Post: ${post.title}`, post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Something went wrong. Please try again later.' });
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('login', { title: 'Login' });
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('signup', { title: 'Signup' });
});

// Dashboard route (protected by withAuth)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }]
    });

    const posts = postsData.map(post => post.get({ plain: true }));

    // Render the dashboard page with the user's posts
    res.render('dashboard', { title: 'My Dashboard', posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Unable to load dashboard. Please try again later.' });
  }
});

// New post route (protected by withAuth)
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', { title: 'Create New Post', loggedIn: req.session.loggedIn });
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'Logged out successfully', redirectUrl: '/' });
    });
  } else {
    res.status(404).json({ message: 'No active session to log out from' });
  }
});

// Edit post route (protected by withAuth)
router.get('/post/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }]
    });

    if (!postData) {
      return res.status(404).render('error', { message: 'Post not found' });
    }

    const post = postData.get({ plain: true });

    // Render the edit post page
    res.render('edit-post', { title: `Edit Post: ${post.title}`, post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Unable to load post for editing. Please try again later.' });
  }
});

module.exports = router;

