const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,    // Database host (not localhost, but from your .env)
    dialect: 'postgres',          // Dialect is PostgreSQL
    port: process.env.DB_PORT || 5432,  // PostgreSQL uses port 5432 by default
    dialectOptions: {
      ssl: {
        require: true,  // Enforce SSL connection for security
        rejectUnauthorized: false,  // Allow self-signed certificates, necessary in cloud environments
      },
    },
    logging: false,  // Disable logging for cleaner output, can be set to true if you want to debug SQL queries
  }
);

module.exports = sequelize;
