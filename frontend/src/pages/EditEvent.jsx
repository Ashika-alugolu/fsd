import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    const found = allEvents.find(e => e.id === parseInt(id));
    
    if (found) {
      setEventData(found);
    } else {
      navigate('/admin/events');
    }
  }, [id, navigate]);

  return (
    <div className="page-container container">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {eventData ? <EventForm initialData={eventData} isEdit={true} /> : <div>Loading...</div>}
      </div>
    </div>
  );
};

export default EditEvent;
