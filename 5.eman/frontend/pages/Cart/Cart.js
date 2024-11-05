import React, { useState } from 'react';
import axios from 'axios';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 150 },
  ]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const proceedToCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        alert('No items in cart');
        return;
      }

      const orders = cartItems.map((item) => ({
        productId: item.id,
        quantity: 1, 
        totalPrice: item.price,
      }));

      await axios.post('https://5.eman-backend.cloud-stacks.com/api/orders', orders, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Order placed successfully');
      setCartItems([]);
    } catch (error) {
      alert('Error placing order');
    }
  };

  return (
    <div className="cart-page">
      <header className="header">
        <div className="logo">Brand Logo</div>
        <h1>Shopping Cart Management</h1>
      </header>
      <nav className="navigation-tabs">
        <ul>
          <li>Category 1</li>
          <li>Category 2</li>
        </ul>
      </nav>
      <div className="content">
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <div className="shopping-cart">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 && <p>No items in cart</p>}
          {cartItems.length > 0 && (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
          )}
          <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
      </div>
      <footer className="footer">
        <div>Policies</div>
        <div>FAQs</div>
        <div>Customer Service</div>
        <div>© Brand Name</div>
      </footer>
    </div>
  );
}

export default Cart;
