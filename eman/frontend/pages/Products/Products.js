import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://eman-backend.cloud-stacks.com/api/products')
      .then(response => setProducts(response.data))
      .catch(() => setError('Failed to fetch products'));
  }, []);

  const handleProductClick = (productId) => {
    axios.get(`https://eman-backend.cloud-stacks.com/api/products/${productId}`)
      .then(response => console.log(response.data))
      .catch(() => setError('Failed to fetch product details'));
  };

  return (
    <div className="products-page">
      <header className="header">
        <div className="logo">Brand Logo</div>
        <div className="nav-links">
          <a href="/account">Account</a>
          <a href="/cart">Cart</a>
        </div>
        <form className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button type="submit">Search</button>
        </form>
      </header>
      <nav className="navigation-tabs">
        <a href="/category1">Category 1</a>
        <a href="/category2">Category 2</a>
      </nav>
      <main className="product-list">
        {error && <p className="error">{error}</p>}
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </main>
      <footer className="footer">
        <div className="links">
          <a href="/contact">Contact Us</a>
          <a href="/about">About Us</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className="legal-links">
          <a href="/terms">Terms and Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default Products;
