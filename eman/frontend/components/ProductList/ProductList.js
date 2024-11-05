import React, { useEffect, useState } from 'react';
import './ProductList.css';
import axios from 'axios';

const ProductList = ({ onProductClick, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://eman-backend.cloud-stacks.com/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`https://eman-backend.cloud-stacks.com/api/products/${productId}/add-to-cart`);
      onAddToCart(productId);
    } catch (err) {
      setError('Failed to add product to cart');
    }
  };

  return (
    <div className="product-list">
      {error && <p className="error">{error}</p>}
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image" 
            onClick={() => onProductClick(product.id)} 
          />
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
          </div>
          <button 
            className="add-to-cart-button" 
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
