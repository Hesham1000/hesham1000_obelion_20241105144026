import React, { useState } from 'react';
import './Checkout.css';
import axios from 'axios';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const proceedToCheckout = async () => {
    try {
      const totalPrice = cart.reduce((total, item) => total + item.price, 0);
      const orderPromises = cart.map(item => {
        return axios.post('https://3.eman-backend.cloud-stacks.com/api/orders', {
          productId: item.id,
          quantity: 1,
          totalPrice: item.price,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
      await Promise.all(orderPromises);
      alert('Order placed successfully');
      setCart([]);
    } catch (error) {
      alert('Error placing order');
    }
  };

  return (
    <div className="checkout-container">
      <header className="header">
        <h1>Brand Logo</h1>
        <nav className="navigation">
          <ul>
            <li>Category 1</li>
            <li>Category 2</li>
            <li>Category 3</li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <section className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </section>
        <aside className="shopping-cart">
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </aside>
      </main>
      <footer className="footer">
        <ul>
          <li>Policies</li>
          <li>FAQs</li>
          <li>Customer Service</li>
        </ul>
        <p>&copy; 2023 Brand Name</p>
      </footer>
    </div>
  );
};

export default Checkout;
