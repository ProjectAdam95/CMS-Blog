const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  // Method to compare login password with hashed password
  async checkPassword(loginPw) {
    return await bcrypt.compare(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,  // User ID type
      allowNull: false,  // Cannot be null
      primaryKey: true,  // Set as primary key
      autoIncrement: true,  // Auto-increment ID
    },
    username: {
      type: DataTypes.STRING,  // Username field
      allowNull: false,  // Cannot be null
      unique: true,  // Must be unique
    },
    password: {
      type: DataTypes.STRING,  // Password field (hashed)
      allowNull: false,  // Cannot be null
    },
  },
  {
    hooks: {
      // Hash the password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hash the password before updating if the password field is modified
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        return updatedUserData;
      },
    },
    sequelize,  // Pass in the sequelize instance
    timestamps: false,  // Disable automatic timestamps
    underscored: true,  // Use snake_case for field names
    modelName: 'user',  // Name of the model
    tableName: 'users',  // Specify the table name
  }
);

module.exports = User;  // Export the User model



