import React, { useState } from 'react';
import './AccountCreation.css';
import axios from 'axios';

function AccountCreation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://eman-backend.cloud-stacks.com/api/users/create', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating account. Please try again.');
    }
  };

  return (
    <div className="account-creation-container">
      <h1>User Login Creation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
      <footer>
        <p>&copy; 2023 Company Name</p>
      </footer>
    </div>
  );
}

export default AccountCreation;
