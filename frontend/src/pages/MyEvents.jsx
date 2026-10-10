import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const allRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    
    const userRegs = allRegistrations.filter(r => r.studentId === user.id);
    
    // Attach venue from events
    const enrichedRegs = userRegs.map(reg => {
      const eventDetails = allEvents.find(e => e.id === reg.eventId);
      return { ...reg, venue: eventDetails?.venue || 'TBA' };
    });
    
    setMyEvents(enrichedRegs);
  }, [user.id]);

  return (
    <div className="page-container container">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>
      
      {myEvents.length > 0 ? (
        <div className="card">
          <div className="table-container mb-0" style={{ boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Sport</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {myEvents.map(reg => (
                  <tr key={reg.id}>
                    <td className="font-semibold">{reg.eventName}</td>
                    <td>{reg.sport}</td>
                    <td>{reg.date}</td>
                    <td>{reg.venue}</td>
                    <td>{reg.registrationDate}</td>
                    <td><StatusBadge status={reg.status} /></td>
                    <td>
                      {reg.result !== 'Not Declared' ? (
                        <span className={`font-semibold ${reg.result === 'Winner' ? 'text-success' : ''}`} style={{ color: reg.result === 'Winner' ? 'var(--success)' : 'inherit' }}>
                          {reg.result}
                        </span>
                      ) : (
                        <span className="text-light">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold mb-2">No Registrations Yet</h2>
          <p className="text-light mb-6">You haven't registered for any events yet. Discover upcoming events and start participating!</p>
          <button className="btn btn-primary" onClick={() => navigate('/events')}>Explore Events</button>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
