import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';

const SportsEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    search: '',
    sport: searchParams.get('sport') || 'All',
    status: 'All'
  });

  const sportsCategories = ['All', 'Cricket', 'Volleyball', 'Badminton', 'Chess', 'Kabaddi', 'Athletics', 'Table Tennis'];
  const statusOptions = ['All', 'Upcoming', 'Ongoing', 'Completed'];

  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(allEvents);
    setFilteredEvents(allEvents);
  }, []);

  useEffect(() => {
    let result = events;

    if (filters.search) {
      result = result.filter(e => e.name.toLowerCase().includes(filters.search.toLowerCase()));
    }
    
    if (filters.sport !== 'All') {
      result = result.filter(e => e.sport === filters.sport);
    }
    
    if (filters.status !== 'All') {
      result = result.filter(e => e.status === filters.status);
    }

    setFilteredEvents(result);
  }, [filters, events]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container container">
      <h1 className="text-3xl font-bold mb-6">Upcoming Sports Events</h1>
      
      <div className="card mb-8">
        <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
          <div className="form-group mb-0">
            <label>Search</label>
            <input 
              type="text" 
              name="search" 
              placeholder="Search events..." 
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group mb-0">
            <label>Sport Category</label>
            <select name="sport" value={filters.sport} onChange={handleFilterChange}>
              {sportsCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group mb-0">
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              {statusOptions.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-1 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-8">
          <p className="text-xl text-light">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default SportsEvents;
