const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    // Save session and log in user
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      // Return a JSON response with the redirect URL
      res.status(200).json({ message: 'Logged in successfully!', redirectUrl: '/dashboard' });
    });
  } catch (err) {
    console.error(err);  // Log any server-side error
    res.status(500).json({ message: 'An error occurred during login', error: err });
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

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      // Return a JSON response with the redirect URL
      res.status(200).json({ message: 'Signed up successfully!', redirectUrl: '/dashboard' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during signup', error: err });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // Return a JSON response to confirm logout and redirect
      res.status(204).json({ message: 'Logged out successfully', redirectUrl: '/' });
    });
  } else {
    res.status(404).json({ message: 'No active session to log out from' });
  }
});

module.exports = router;






