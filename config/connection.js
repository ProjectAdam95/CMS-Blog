const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,  // Ensures SSL works for cloud providers like Heroku/Render
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || 'localhost',  // Use environment variable for DB_HOST if available
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,  // Use environment variable for DB_PORT if available
      }
    );

module.exports = sequelize;


