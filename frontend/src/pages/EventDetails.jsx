import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { Calendar, MapPin, Users, User } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    const foundEvent = allEvents.find(e => e.id === parseInt(id));
    
    if (foundEvent) {
      setEvent(foundEvent);
      
      if (isLoggedIn && user?.role === 'student') {
        const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        const existingReg = registrations.find(r => r.eventId === foundEvent.id && r.studentId === user.id);
        if (existingReg) setIsRegistered(true);
      }
    }
  }, [id, isLoggedIn]);

  const handleRegister = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (user.role !== 'student') {
      setMessage('Only students can register for events.');
      return;
    }

    if (event.currentParticipants >= event.maxParticipants) {
      setMessage('Registration closed. Event is full.');
      return;
    }

    // Mock registration logic
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    
    const newReg = {
      id: Date.now(),
      studentId: user.id,
      studentName: user.name,
      studentEmail: user.email,
      eventId: event.id,
      eventName: event.name,
      sport: event.sport,
      date: event.date,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Registered',
      result: 'Not Declared'
    };
    
    registrations.push(newReg);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    // Update event participant count
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = allEvents.map(e => {
      if (e.id === event.id) {
        return { ...e, currentParticipants: e.currentParticipants + 1 };
      }
      return e;
    });
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    
    setEvent({ ...event, currentParticipants: event.currentParticipants + 1 });
    setIsRegistered(true);
    setMessage('Successfully registered for the event!');
  };

  if (!event) return <div className="container mt-8 text-center">Loading event details...</div>;

  const isFull = event.currentParticipants >= event.maxParticipants;
  const canRegister = event.status === 'Upcoming' && !isFull && !isRegistered;

  return (
    <div className="page-container container">
      <button className="btn btn-outline mb-6" onClick={() => navigate('/events')}>
        ← Back to Events
      </button>
      
      <div className="card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-light font-semibold mb-2 block">{event.sport}</span>
            <h1 className="text-3xl font-bold">{event.name}</h1>
          </div>
          <StatusBadge status={event.status} />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-1 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Event Details</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-secondary" style={{color: 'var(--secondary-color)'}}/>
                <div>
                  <div className="text-sm text-light">Date</div>
                  <div className="font-semibold">{event.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-secondary" style={{color: 'var(--secondary-color)'}}/>
                <div>
                  <div className="text-sm text-light">Venue</div>
                  <div className="font-semibold">{event.venue}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="text-secondary" style={{color: 'var(--secondary-color)'}}/>
                <div>
                  <div className="text-sm text-light">Coordinator</div>
                  <div className="font-semibold">{event.coordinator}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Registration Info</h3>
            <div className="card" style={{ backgroundColor: '#f8fafc', boxShadow: 'none', border: '1px solid #e2e8f0' }}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Users />
                  <span className="font-semibold">Participants</span>
                </div>
                <span className="font-bold">{event.currentParticipants} / {event.maxParticipants}</span>
              </div>
              
              <div style={{ width: '100%', backgroundColor: '#e2e8f0', height: '8px', borderRadius: '4px', marginBottom: '1rem' }}>
                <div 
                  style={{ 
                    width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%`, 
                    backgroundColor: isFull ? 'var(--danger)' : 'var(--success)', 
                    height: '100%', 
                    borderRadius: '4px' 
                  }}
                ></div>
              </div>
              
              <div className="text-center mt-6">
                {message && <div className={`mb-4 text-sm font-semibold ${isRegistered ? 'text-success' : 'text-danger'}`} style={{ color: isRegistered ? 'var(--success)' : 'var(--danger)' }}>{message}</div>}
                
                {isRegistered ? (
                  <button className="btn btn-outline w-full" disabled style={{ width: '100%', cursor: 'not-allowed' }}>
                    Already Registered
                  </button>
                ) : event.status !== 'Upcoming' ? (
                  <button className="btn btn-outline w-full" disabled style={{ width: '100%', cursor: 'not-allowed' }}>
                    Registration Closed
                  </button>
                ) : isFull ? (
                  <button className="btn btn-danger w-full" disabled style={{ width: '100%', cursor: 'not-allowed' }}>
                    Event Full
                  </button>
                ) : (
                  <button className="btn btn-primary w-full" style={{ width: '100%' }} onClick={handleRegister}>
                    Register for Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-2">Description</h3>
          <p className="text-light" style={{ whiteSpace: 'pre-line' }}>{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
