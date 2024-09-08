const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,    // Database host (from your .env)
    dialect: 'postgres',          // We're using PostgreSQL
    port: process.env.DB_PORT || 5432,  // PostgreSQL port (5432 by default)
    dialectOptions: {
      ssl: {
        require: true,  // Ensure SSL connection for Render
        rejectUnauthorized: false,  // Allow self-signed certificates for Render
      },
    },
    logging: false,  // Set to true if you need SQL query logs
  }
);

module.exports = sequelize;
