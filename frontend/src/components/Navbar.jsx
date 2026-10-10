import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          🏆 Sports Event Portal
        </Link>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/events" className={isActive('/events')}>Events</Link>
          
          {isLoggedIn ? (
            <>
              {user?.role === 'student' && (
                <>
                  <Link to="/student/dashboard" className={isActive('/student/dashboard')}>Dashboard</Link>
                  <Link to="/student/my-events" className={isActive('/student/my-events')}>My Events</Link>
                  <Link to="/student/results" className={isActive('/student/results')}>Results</Link>
                </>
              )}
              {user?.role === 'admin' && (
                <>
                  <Link to="/admin/dashboard" className={isActive('/admin/dashboard')}>Dashboard</Link>
                  <Link to="/admin/events" className={isActive('/admin/events')}>Manage Events</Link>
                  <Link to="/admin/registrations" className={isActive('/admin/registrations')}>Registrations</Link>
                  <Link to="/admin/results" className={isActive('/admin/results')}>Results</Link>
                </>
              )}
              <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                Logout ({user?.name || user?.role})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'var(--primary-color)' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
