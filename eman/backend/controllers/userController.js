const { Sequelize } = require('sequelize');
const User = require('../models/User');

const sequelize = new Sequelize('eman', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306
});

User.init(sequelize);

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({
      message: 'Account created successfully. Please check your email for confirmation.',
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating account. Please try again.', error: error.message });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    res.status(200).json({ message: 'Authentication successful', user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = {
  createUser,
  authenticateUser
};

const { Model, Sequelize } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      email: 'user1@example.com',
      password: 'hashed_password1'
    },
    {
      email: 'user2@example.com',
      password: 'hashed_password2'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};