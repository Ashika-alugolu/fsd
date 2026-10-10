import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = ({ initialData, isEdit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sport: 'Cricket',
    date: '',
    venue: '',
    coordinator: '',
    maxParticipants: '',
    description: '',
    status: 'Upcoming'
  });
  const [error, setError] = useState('');

  const sportsOptions = ['Cricket', 'Volleyball', 'Badminton', 'Chess', 'Kabaddi', 'Athletics', 'Table Tennis'];
  const statusOptions = ['Upcoming', 'Ongoing', 'Completed'];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (parseInt(formData.maxParticipants) <= 0) {
      setError('Maximum participants must be greater than 0');
      return;
    }

    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    
    if (isEdit) {
      const updatedEvents = allEvents.map(ev => ev.id === formData.id ? { ...formData, maxParticipants: parseInt(formData.maxParticipants) } : ev);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    } else {
      const newEvent = {
        ...formData,
        id: Date.now(),
        maxParticipants: parseInt(formData.maxParticipants),
        currentParticipants: 0
      };
      allEvents.push(newEvent);
      localStorage.setItem('events', JSON.stringify(allEvents));
    }
    
    navigate('/admin/events');
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      {error && <div className="error-msg mb-4 text-center">{error}</div>}
      
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        <div className="form-group">
          <label>Event Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Sport Category</label>
          <select name="sport" value={formData.sport} onChange={handleChange} required>
            {sportsOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Venue</label>
          <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Coordinator</label>
          <input type="text" name="coordinator" value={formData.coordinator} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Maximum Participants</label>
          <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} required min="1" />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="4"></textarea>
        </div>
      </div>
      
      <div className="flex gap-4 mt-6">
        <button type="submit" className="btn btn-primary">{isEdit ? 'Update Event' : 'Create Event'}</button>
        <button type="button" className="btn btn-outline" onClick={() => navigate('/admin/events')}>Cancel</button>
      </div>
    </form>
  );
};

export default EventForm;
