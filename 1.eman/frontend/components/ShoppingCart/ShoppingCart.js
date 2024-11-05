import React, { useState } from 'react';
import axios from 'axios';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const proceedToCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
    } else {
      try {
        const orders = cartItems.map(item => ({
          productId: item.id,
          quantity: 1,
          totalPrice: item.price,
        }));

        await Promise.all(orders.map(order => 
          axios.post('https://1.eman-backend.cloud-stacks.com/api/orders', order, {
            headers: { 'Content-Type': 'application/json' }
          })
        ));

        alert('Orders created successfully');
        setCartItems([]);
      } catch (error) {
        alert('Error creating orders');
      }
    }
  };

  return (
    <div className="shopping-cart">
      <header className="header">
        <h1>Brand Logo</h1>
      </header>
      <nav className="nav-tabs">
        <button>Category 1</button>
        <button>Category 2</button>
        <button>Category 3</button>
      </nav>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <aside className="cart">
        <h2>Shopping Cart</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
        <button onClick={proceedToCheckout}>Proceed to Checkout</button>
      </aside>
      <footer className="footer">
        <a href="#">Policies</a>
        <a href="#">FAQs</a>
        <a href="#">Customer Service</a>
        <p>&copy; 2023 Brand Name</p>
      </footer>
    </div>
  );
};

export default ShoppingCart;
