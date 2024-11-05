const express = require('express');
const router = express.Router();
const { createUser, authenticateUser } = require('../controllers/userController');
const { User } = require('../models/User'); // Import the User model

// Create a new user account
router.post('/create', createUser);

// Authenticate user
router.post('/authenticate', authenticateUser);

module.exports = router;

Ensure that the `User` model in `models/User.js` is defined as follows:

const { Model, Sequelize } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    });
  }
}

module.exports = User;

Ensure that your database configuration file replaces any instance of 'localhost' with 'db' for the database host configuration:

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
  // other configuration options
});

module.exports = sequelize;