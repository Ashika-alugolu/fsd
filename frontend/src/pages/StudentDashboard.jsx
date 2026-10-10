import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import { Calendar, Activity, CheckCircle, Award } from 'lucide-react';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    upcoming: 0,
    myRegistrations: 0,
    activeRegistrations: 0,
    completed: 0
  });
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    const allRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    
    const upcomingEvents = allEvents.filter(e => e.status === 'Upcoming');
    
    const myRegs = allRegistrations.filter(r => r.studentId === user.id);
    const activeRegs = myRegs.filter(r => ['Registered', 'Approved'].includes(r.status));
    const completedRegs = myRegs.filter(r => r.status === 'Completed');
    
    setStats({
      upcoming: upcomingEvents.length,
      myRegistrations: myRegs.length,
      activeRegistrations: activeRegs.length,
      completed: completedRegs.length
    });
    
    setRecentRegistrations(myRegs.slice(0, 5));
  }, [user.id]);

  return (
    <div className="page-container container">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name} 👋</h1>
          <p className="text-light mt-1">Student Dashboard</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => navigate('/events')}>Browse Events</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-2 gap-6 mb-8">
        <DashboardCard title="Upcoming Events" value={stats.upcoming} icon={Calendar} color="blue" />
        <DashboardCard title="My Registrations" value={stats.myRegistrations} icon={Activity} color="indigo" />
        <DashboardCard title="Active Registrations" value={stats.activeRegistrations} icon={CheckCircle} color="green" />
        <DashboardCard title="Completed Events" value={stats.completed} icon={Award} color="yellow" />
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Recent Registrations</h2>
          <Link to="/student/my-events" className="text-secondary font-semibold" style={{color: 'var(--secondary-color)'}}>View All</Link>
        </div>
        
        {recentRegistrations.length > 0 ? (
          <div className="table-container mb-0" style={{ boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Sport</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.map(reg => (
                  <tr key={reg.id}>
                    <td className="font-semibold">{reg.eventName}</td>
                    <td>{reg.sport}</td>
                    <td>{reg.date}</td>
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
        ) : (
          <div className="text-center py-8">
            <p className="text-light mb-4">You haven't registered for any events yet.</p>
            <button className="btn btn-outline" onClick={() => navigate('/events')}>Explore Events</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
