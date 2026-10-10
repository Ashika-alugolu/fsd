import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { Edit2, Trash2, Eye } from 'lucide-react';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(allEvents);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(e => e.id !== id);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      
      // Optionally clean up registrations
      const allRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
      const updatedRegs = allRegistrations.filter(r => r.eventId !== id);
      localStorage.setItem('registrations', JSON.stringify(updatedRegs));
    }
  };

  return (
    <div className="page-container container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <button className="btn btn-primary" onClick={() => navigate('/admin/events/add')}>+ Add New Event</button>
      </div>

      <div className="card">
        <div className="table-container mb-0" style={{ boxShadow: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Sport</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Coordinator</th>
                <th>Participants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map(event => (
                  <tr key={event.id}>
                    <td className="font-semibold">{event.name}</td>
                    <td>{event.sport}</td>
                    <td>{event.date}</td>
                    <td>{event.venue}</td>
                    <td>{event.coordinator}</td>
                    <td>{event.currentParticipants || 0}/{event.maxParticipants}</td>
                    <td><StatusBadge status={event.status} /></td>
                    <td>
                      <div className="flex gap-2">
                        <button className="text-secondary" style={{color: 'var(--secondary-color)', background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => navigate(`/events/${event.id}`)} title="View">
                          <Eye size={18} />
                        </button>
                        <button className="text-warning" style={{color: 'var(--warning)', background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => navigate(`/admin/events/edit/${event.id}`)} title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button className="text-danger" style={{color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => handleDelete(event.id)} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6">No events found. Create one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
