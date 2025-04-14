import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Welcome Back</h2>
        <p>Sign in to manage your tasks</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div style={{ position: 'relative' }}>
            <FiMail style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#636e72'
            }} />
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <FiLock style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#636e72'
            }} />
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={loading}
        >
          <FiLogIn style={{ marginRight: '8px' }} />
          {loading ? 'Signing In Please Wait...' : 'Sign In'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <p style={{ color: '#636e72' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
