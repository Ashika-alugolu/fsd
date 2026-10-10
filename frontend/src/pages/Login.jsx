import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Mock authentication
    if (formData.email === 'student@gmail.com' && formData.password === 'password') {
      const user = { id: 1, name: 'Alice Johnson', email: 'student@gmail.com', role: 'student' };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/student/dashboard');
    } else if (formData.email === 'admin@gmail.com' && formData.password === 'password') {
      const user = { id: 999, name: 'Admin User', email: 'admin@gmail.com', role: 'admin' };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Use student@gmail.com or admin@gmail.com with password "password".');
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-light text-sm">
            Mock Login Info:<br/>
            Student: student@gmail.com | pass: password<br/>
            Admin: admin@gmail.com | pass: password
          </p>
        </div>

        <div className="mt-6 text-center">
          <p>Don't have an account? <Link to="/register" className="text-accent font-semibold" style={{ color: 'var(--accent-color)'}}>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
