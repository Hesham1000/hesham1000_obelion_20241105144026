const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('eman', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Product extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: false
    });
  }
}

module.exports = Product;