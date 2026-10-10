import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize mock data if not present
    if (!localStorage.getItem('events')) {
      import('../data/mockData').then(module => {
        localStorage.setItem('events', JSON.stringify(module.events));
        localStorage.setItem('students', JSON.stringify(module.students));
        localStorage.setItem('registrations', JSON.stringify(module.registrations));
        localStorage.setItem('results', JSON.stringify(module.results));
        loadEvents();
      });
    } else {
      loadEvents();
    }
  }, []);

  const loadEvents = () => {
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    const upcoming = allEvents.filter(e => e.status.toLowerCase() === 'upcoming').slice(0, 4);
    setUpcomingEvents(upcoming);
  };

  const sportsCategories = [
    { name: "Cricket", icon: "🏏" },
    { name: "Volleyball", icon: "🏐" },
    { name: "Badminton", icon: "🏸" },
    { name: "Chess", icon: "♟" },
    { name: "Kabaddi", icon: "🤼" },
    { name: "Athletics", icon: "🏃" },
    { name: "Table Tennis", icon: "🏓" }
  ];

  return (
    <div className="page-container" style={{ padding: 0 }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>SPORTS EVENT<br/>MANAGEMENT PORTAL</h1>
          <h2 className="mb-4">"Participate. Compete. Achieve."</h2>
          <p>Discover upcoming college sports events, register online, and track your participation and results.</p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="btn btn-primary" style={{backgroundColor: 'white', color: 'var(--primary-color)'}} onClick={() => navigate('/events')}>
              Explore Events
            </button>
            <button className="btn btn-outline" style={{borderColor: 'white', color: 'white'}} onClick={() => navigate('/register')}>
              Register Now
            </button>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Sports Categories */}
        <section className="mb-8 mt-8">
          <h2 className="text-3xl font-bold text-center mb-6">Sports Categories</h2>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {sportsCategories.map((sport, index) => (
              <div key={index} className="card text-center flex-col items-center justify-center cursor-pointer" style={{ width: '150px' }} onClick={() => navigate(`/events?sport=${sport.name}`)}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{sport.icon}</div>
                <div className="font-semibold">{sport.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link to="/events" className="btn btn-outline">View All</Link>
          </div>
          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-8 py-8">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-6 text-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="card">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-bold mb-2">Register</h3>
              <p className="text-light">Create your student account to get started.</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-bold mb-2">Explore Events</h3>
              <p className="text-light">Browse through various sports categories and events.</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-bold mb-2">Join a Competition</h3>
              <p className="text-light">Register for events you want to participate in.</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">4️⃣</div>
              <h3 className="text-xl font-bold mb-2">Track Results</h3>
              <p className="text-light">Check your performance and event winners.</p>
            </div>
          </div>
        </section>

        {/* Statistics section */}
        <section className="mb-8 card bg-primary" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-light" style={{color: '#cbd5e1'}}>Sports</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-light" style={{color: '#cbd5e1'}}>Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-light" style={{color: '#cbd5e1'}}>Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-light" style={{color: '#cbd5e1'}}>Registrations</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
