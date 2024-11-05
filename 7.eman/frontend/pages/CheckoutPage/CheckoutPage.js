import React, { useState } from 'react';
import './CheckoutPage.css';
import axios from 'axios';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 15 },
    { id: 3, name: 'Product 3', price: 20 },
  ]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const proceedToCheckout = async () => {
    try {
      const orderPromises = cart.map((item) => {
        return axios.post('https://7.eman-backend.cloud-stacks.com/api/orders', {
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
      alert('Proceeding to checkout');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to proceed to checkout. Please try again.');
    }
  };

  return (
    <div className="checkout-page">
      <header className="header">
        <div className="brand-logo">Brand Logo</div>
      </header>
      <nav className="navigation-tabs">
        <button>Category 1</button>
        <button>Category 2</button>
        <button>Category 3</button>
      </nav>
      <main>
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
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </aside>
      </main>
      <footer className="footer">
        <button className="checkout-button" onClick={proceedToCheckout}>
          Proceed to Checkout
        </button>
        <div className="additional-links">
          <a href="#policies">Policies</a>
          <a href="#faqs">FAQs</a>
          <a href="#customer-service">Customer Service</a>
        </div>
        <div className="copyright">© Brand Name</div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
