require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

// Routes
const homeRoutes = require('./routes/homeRoutes');
const apiRoutes = require('./routes/api');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Session settings
const sess = {
  secret: process.env.SESSION_SECRET || 'myassignmentsecret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Set to true in production to enforce HTTPS
    sameSite: 'strict', // CSRF protection
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(session(sess));

// No-cache middleware for development
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Cache-Control', 'no-store');  // Prevents caching
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the "public" folder

// Handlebars setup
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use('/', homeRoutes);
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
