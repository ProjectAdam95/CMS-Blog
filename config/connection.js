const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Use DB_NAME from .env
  process.env.DB_USER,     // Use DB_USER from .env
  process.env.DB_PASSWORD, // Use DB_PASSWORD from .env
  {
    host: process.env.DB_HOST || 'localhost', // Use DB_HOST or default to 'localhost'
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,        // Use DB_PORT or default to 5432
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,  // Ensure SSL connection on Render
      },
    },
  }
);

module.exports = sequelize;



