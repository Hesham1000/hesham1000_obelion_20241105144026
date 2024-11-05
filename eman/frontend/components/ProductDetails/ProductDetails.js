import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
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

    return (
        <div className="product-page">
            <header className="header">
                <div className="brand-logo">Brand Logo</div>
                <div className="navigation">
                    <a href="/account">Account</a>
                    <a href="/cart">Cart</a>
                    <input type="text" placeholder="Search products..." />
                </div>
            </header>
            <nav className="navigation-tabs">
                <a href="/category1">Category 1</a>
                <a href="/category2">Category 2</a>
                <a href="/category3">Category 3</a>
            </nav>
            <main className="product-grid">
                {error ? (
                    <p>{error}</p>
                ) : (
                    products.map(product => (
                        <div className="product-item" key={product.id}>
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                            <button className="add-to-cart-button">Add to Cart</button>
                        </div>
                    ))
                )}
            </main>
            <footer className="footer">
                <div className="footer-links">
                    <a href="/contact">Contact Us</a>
                    <a href="/about">About Us</a>
                    <a href="/faq">FAQ</a>
                </div>
                <div className="footer-info">
                    <p>© 2023 Company Name</p>
                    <a href="/terms">Terms and Conditions</a>
                    <a href="/privacy">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
};

export default ProductDetails;
