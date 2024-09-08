const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    // Use checkPassword method from the User model
    if (!user || !(await user.checkPassword(req.body.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Save user session
    req.session.user_id = user.id;
    req.session.logged_in = true;

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
      }
      res.json({ message: 'Login successful', redirectUrl: '/dashboard' });
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received with:', req.body);

    const existingUser = await User.findOne({ where: { username: req.body.username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
    }

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.user_id = newUser.id;
    req.session.logged_in = true;

    req.session.save(() => {
      res.status(200).json({ message: 'Signed up successfully!', redirectUrl: '/dashboard' });
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'An error occurred during signup.', error: err });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).json({ message: 'Logged out successfully', redirectUrl: '/' });
    });
  } else {
    res.status(404).json({ message: 'No active session to log out from' });
  }
});

module.exports = router;





