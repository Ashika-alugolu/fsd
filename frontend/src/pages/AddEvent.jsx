import React from 'react';
import EventForm from '../components/EventForm';

const AddEvent = () => {
  return (
    <div className="page-container container">
      <h1 className="text-3xl font-bold mb-6">Add New Event</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <EventForm isEdit={false} />
      </div>
    </div>
  );
};

export default AddEvent;
