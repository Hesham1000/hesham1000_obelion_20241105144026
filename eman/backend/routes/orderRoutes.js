const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const Order = require('../models/Order');

// POST /orders - Create a new order
router.post('/orders', createOrder);

// GET /orders - Retrieve all orders
router.get('/orders', getOrders);

// GET /orders/:orderId - Retrieve a specific order by ID
router.get('/orders/:orderId', getOrderById);

// PUT /orders/:orderId - Update a specific order by ID
router.put('/orders/:orderId', updateOrder);

// DELETE /orders/:orderId - Delete a specific order by ID
router.delete('/orders/:orderId', deleteOrder);

module.exports = router;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

Order.init(sequelize);

module.exports = Order;

// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
});

module.exports = sequelize;