const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

// Routes
const homeRoutes = require('./routes/homeRoutes');  // Include home routes for rendering pages
const apiRoutes = require('./routes/api');  // Include API routes from the routes folder
const helpers = require('./utils/helpers');  // Include helpers for Handlebars

const app = express();
const PORT = process.env.PORT || 3001;

// Session settings
const sess = {
  secret: process.env.SESSION_SECRET || 'myassignmentsecret',  
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,  // Cookie lasts for 1 day
    httpOnly: true,  // Prevents JavaScript from accessing cookies
    secure: process.env.NODE_ENV === 'production',  // Set secure cookies only in production (HTTPS)
    sameSite: 'strict',  // Helps prevent CSRF
  },
  resave: false,
  saveUninitialized: false,  // Change to false to avoid creating empty sessions
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(session(sess));  // Session middleware

// Handlebars setup
const hbs = exphbs.create({ helpers });  // Handlebars with helpers
app.engine('handlebars', hbs.engine);  // Register Handlebars as the view engine
app.set('view engine', 'handlebars');

app.use(express.json());  // Parse JSON data
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the "public" folder

// Routes
app.use('/', homeRoutes);  // Front-end pages
app.use('/api', apiRoutes);  // Backend API routes from the routes/api folder

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {  // Use force: true with caution
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
