const { Model, DataTypes } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    super.init({
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0,
        },
      },
    }, {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: false,
    });
  }
}

module.exports = Order;
