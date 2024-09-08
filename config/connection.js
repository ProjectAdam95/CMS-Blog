const Sequelize = require('sequelize');
require('dotenv').config();  // Load .env variables

// Use environment variables for connection
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,    // Database host
    dialect: 'postgres',          // Using PostgreSQL
    port: process.env.DB_PORT || 5432,  // PostgreSQL port
    dialectOptions: {
      ssl: {
        require: true,  // Ensure SSL connection for security
        rejectUnauthorized: false,  // Allow self-signed certificates, necessary in cloud environments
      },
    },
    logging: false,  // Disable logging for cleaner output
  }
);

module.exports = sequelize;


