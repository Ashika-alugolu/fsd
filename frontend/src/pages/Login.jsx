import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to log in');

      const user = { ...data, id: data._id };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', 'true');
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the server');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container flex justify-center items-center" style={{ minHeight: '60vh' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        {error && <div className="error-msg mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange}
              placeholder="student@gmail.com / admin@gmail.com"
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange}
              placeholder="password"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
        </div>

        <div className="mt-6 text-center">
          <p>Don't have an account? <Link to="/register" className="text-accent font-semibold" style={{ color: 'var(--accent-color)'}}>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
