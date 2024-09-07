const router = require('express').Router();
const { Post, User, Comment } = require('../models'); 
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    
    const posts = (await Post.findAll({ 
      include: [{ model: User, attributes: ['username'] }]
    })).map(post => post.get({ plain: true }));

    // Render the home page, passing posts and the login status
    res.render('home', { title: 'Home Page', posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }  // Include comments with users
      ]
    });
    
    if (!post) return res.status(404).json({ message: 'No post found' });

   
    res.render('post', { title: `Post: ${post.title}`, post: post.get({ plain: true }), loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;



router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('login');
});

// Render the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('signup');
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch posts for the logged-in user only
    const posts = (await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }]
    })).map(post => post.get({ plain: true }));

    // Render the dashboard page with the user's posts
    res.render('dashboard', { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', { loggedIn: req.session.logged_in });
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => res.status(204).end());  // Logout user
  } else {
    res.status(404).end();  // User was not logged in
  }
});


router.get('/post/edit/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }]
    });

    if (!post) {
      res.status(404).json({ message: 'No post found' });
      return;
    }

    
    res.render('edit-post', { post: post.get({ plain: true }), loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;

