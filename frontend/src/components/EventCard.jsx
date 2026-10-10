import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="card flex-col flex justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-light font-semibold">{event.sport}</span>
          <StatusBadge status={event.status} />
        </div>
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        
        <div className="flex flex-col gap-2 mb-4 text-light">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{event.currentParticipants || 0} / {event.maxParticipants} Participants</span>
          </div>
          <div className="text-sm mt-2">
            Coordinator: {event.coordinator}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
        <button 
          className="btn btn-outline flex-1"
          onClick={() => navigate(`/events/${event.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
