// Middleware to check if the user is authenticated
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect to the login page
  if (!req.session.logged_in) {
    return res.redirect('/login');
  }
  // If the user is logged in, proceed to the next middleware/route
  next();
};

module.exports = withAuth;

