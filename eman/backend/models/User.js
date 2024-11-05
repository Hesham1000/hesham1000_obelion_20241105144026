const { Model, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

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
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          this.setDataValue('password', bcrypt.hashSync(value, salt));
        },
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    });
  }

  static async authenticate(email, password) {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }
    return user;
  }
}

module.exports = User;