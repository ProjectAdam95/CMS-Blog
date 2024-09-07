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
      res.json({ user, message: 'Logged in successfully!' });
    });
  } catch (err) {
    console.error(err);  // Log any server-side error
    res.status(500).json({ message: 'An error occurred during login', error: err });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signing up with:', req.body);  // Log the signup attempt for debugging
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,  // Password will be hashed by User model hooks
    });

    // Automatically log the user in after signup
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.json({ user: newUser, message: 'You are now signed up and logged in!' });
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
      res.status(204).end();  // No content on successful logout
    });
  } else {
    res.status(404).json({ message: 'No active session to log out from' });
  }
});

module.exports = router;




