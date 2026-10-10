import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to create account');

      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the server');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container flex justify-center items-center" style={{ minHeight: '70vh' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        {error && <div className="error-msg mb-4 text-center">{error}</div>}
        {success && <div className="mb-4 text-center" style={{color: 'var(--success)'}}>Registration successful! Redirecting to login...</div>}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleChange}
              placeholder="John Doe"
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange}
              placeholder="student@gmail.com"
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
              placeholder="Min 6 characters"
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword} 
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>Already have an account? <Link to="/login" className="text-accent font-semibold" style={{ color: 'var(--accent-color)'}}>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
