// Importing the Order model
const Order = require('../models/Order');

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    const { productId, quantity, totalPrice } = req.body;

    // Validate request data
    if (!productId || !quantity || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new order
    const newOrder = await Order.create({
      productId,
      quantity,
      totalPrice,
    });

    // Return success response with created order
    return res.status(201).json(newOrder);

  } catch (error) {
    // Error handling
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to retrieve all orders
const getOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.findAll();

    // Return success response with all orders
    return res.status(200).json(orders);

  } catch (error) {
    // Error handling
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to retrieve a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch order by ID
    const order = await Order.findByPk(orderId);

    // Check if order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return success response with the order
    return res.status(200).json(order);

  } catch (error) {
    // Error handling
    console.error('Error retrieving order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update an order
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { productId, quantity, totalPrice } = req.body;

    // Fetch order by ID
    const order = await Order.findByPk(orderId);

    // Check if order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order details
    order.productId = productId || order.productId;
    order.quantity = quantity || order.quantity;
    order.totalPrice = totalPrice || order.totalPrice;

    // Save updated order
    await order.save();

    // Return success response with the updated order
    return res.status(200).json(order);

  } catch (error) {
    // Error handling
    console.error('Error updating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete an order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch order by ID
    const order = await Order.findByPk(orderId);

    // Check if order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Delete the order
    await order.destroy();

    // Return success response
    return res.status(204).send();

  } catch (error) {
    // Error handling
    console.error('Error deleting order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};