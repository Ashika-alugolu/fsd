import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>🏆 Sports Event Portal</h3>
            <p className="text-light" style={{color: '#cbd5e1'}}>
              Participate. Compete. Achieve.<br/>
              Your one-stop portal for all college sports events.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          <div>
            <h3>Sports</h3>
            <ul>
              <li>Cricket</li>
              <li>Volleyball</li>
              <li>Badminton</li>
              <li>Athletics</li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>Email: sports@college.edu</li>
              <li>Phone: +1 234 567 890</li>
              <li>Office: Sports Complex, Main Campus</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sports Event Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
