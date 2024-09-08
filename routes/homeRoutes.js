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

    // Render the home page, passing posts and login status
    res.render('home', { title: 'Home Page', posts, loggedIn: req.session.logged_in });
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
    res.render('post', { title: `Post: ${post.title}`, post, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Something went wrong. Please try again later.' });
  }
});

// Login route (POST) - Authenticate user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user || !(await user.checkPassword(req.body.password))) {  // Check if username and password are valid
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;  // Save login session
      res.json({ message: 'Login successful', redirectUrl: '/dashboard' });
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
});

// Login route (GET) - Render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');  // Redirect to dashboard if already logged in
  }
  res.render('login', { title: 'Login' });  // Render login page
});

// Signup route - Render signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');  // Redirect to home if logged in
  }
  res.render('signup', { title: 'Signup' });
});

// Dashboard route - Display user-specific posts (protected by withAuth)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: { user_id: req.session.user_id },  // Fetch posts by logged-in user
      include: [{ model: User, attributes: ['username'] }]
    });

    const posts = postsData.map(post => post.get({ plain: true }));

    // Render dashboard page
    res.render('dashboard', { 
      title: 'My Dashboard', 
      posts, 
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Unable to load dashboard. Please try again later.' });
  }
});

// New post route - Render new post form (protected by withAuth)
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', { title: 'Create New Post', loggedIn: req.session.logged_in });
});

// Logout route - End the session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.json({ message: 'Logged out successfully', redirectUrl: '/' });
    });
  } else {
    res.status(404).json({ message: 'No active session to log out from' });
  }
});

// Edit post route - Render the edit post page (protected by withAuth)
router.get('/post/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }]
    });

    if (!postData) {
      return res.status(404).render('error', { message: 'Post not found' });
    }

    const post = postData.get({ plain: true });

    // Render edit post page
    res.render('edit-post', { title: `Edit Post: ${post.title}`, post, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Unable to load post for editing. Please try again later.' });
  }
});

module.exports = router;



