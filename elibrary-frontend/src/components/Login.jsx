import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Library } from 'lucide-react';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
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
          
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-btn">Login to Platform</button>
        </form>
        
        <p className="signup-link">
          Don't have an account? <span className="link-text" onClick={onSwitchToSignup}>Create one for free</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
