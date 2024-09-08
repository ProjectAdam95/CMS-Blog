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

// Log current environment (development or production)
console.log(`Running in ${process.env.NODE_ENV} mode.`);

// Session settings
const sess = {
  secret: process.env.SESSION_SECRET || 'myassignmentsecret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    httpOnly: false, // Allow cookies to be accessed via JavaScript (insecure, but functional)
    secure: false, // Don't require HTTPS (even in production; this is insecure but will work)
    sameSite: 'lax', // Allow cookies during cross-site redirects
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));


// Apply session middleware
app.use(session(sess));

// **Sync the sessions table**
const store = new SequelizeStore({
  db: sequelize,
});
store.sync();  // Ensures the sessions table is created

// No-cache middleware for development
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Cache-Control', 'no-store');  // Prevents caching
    console.log('Caching disabled for development');
  }
  next();
});

app.use((req, res, next) => {
  console.log('Session info:', req.session);
  next();
});

// Middleware for parsing JSON and URL-encoded data
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
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}, // Show detailed errors only in development
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

