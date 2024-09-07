const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    // Check if user exists and if the password is correct
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    // Save session and log in user
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      // Redirect to dashboard after login
      res.redirect('/dashboard');  // Added redirect to dashboard
    });
  } catch (err) {
    console.error(err);  // Log any server-side error
    res.status(500).json({ message: 'An error occurred during login', error: err });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received with:', req.body);  // Log the signup request body

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username: req.body.username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
    }

    // Create new user
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,  // Ensure password hashing is handled in the model
    });

    // Automatically log the user in after signup
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      // Redirect to dashboard after signup
      res.redirect('/dashboard');  // Added redirect to dashboard
    });
  } catch (err) {
    console.error(err);  // Log any error during signup
    res.status(500).json(err);
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy session to log out user
    req.session.destroy(() => {
      // Redirect to homepage after logout
      res.redirect('/');  // Added redirect to homepage
    });
  } else {
    res.status(404).json({ message: 'No active session to log out from' });
  }
});

module.exports = router;





