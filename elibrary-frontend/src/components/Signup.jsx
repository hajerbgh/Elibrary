import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Library } from 'lucide-react';

const Signup = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', { name, email, password });
      onSignupSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">
            <Library size={32} color="white" />
          </div>
          <h2>THE BOOKS</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="auth-error">{error}</p>}
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="login-btn">Create Account</button>
        </form>
        
        <p className="signup-link">
          Already have an account? <span className="link-text" onClick={onSwitchToLogin}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
