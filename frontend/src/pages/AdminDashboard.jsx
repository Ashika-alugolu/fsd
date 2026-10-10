import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import { Calendar, Users, Activity, Award } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalStudents: 0,
    totalRegistrations: 0,
    completedEvents: 0
  });
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    const allRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const allStudents = JSON.parse(localStorage.getItem('students')) || [];
    
    setStats({
      totalEvents: allEvents.length,
      totalStudents: allStudents.length,
      totalRegistrations: allRegistrations.length,
      completedEvents: allEvents.filter(e => e.status === 'Completed').length
    });
    
    // Get 5 most recent registrations
    const sortedRegs = [...allRegistrations].sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
    setRecentRegistrations(sortedRegs.slice(0, 5));
  }, []);

  return (
    <div className="page-container container">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-light mt-1">Portal Overview</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => navigate('/admin/events/add')}>+ Add Event</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-2 gap-6 mb-8">
        <DashboardCard title="Total Events" value={stats.totalEvents} icon={Calendar} color="blue" />
        <DashboardCard title="Total Students" value={stats.totalStudents} icon={Users} color="indigo" />
        <DashboardCard title="Total Registrations" value={stats.totalRegistrations} icon={Activity} color="green" />
        <DashboardCard title="Completed Events" value={stats.completedEvents} icon={Award} color="yellow" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/events" className="btn btn-outline flex-1 text-center">Manage Events</Link>
            <Link to="/admin/registrations" className="btn btn-outline flex-1 text-center">View Registrations</Link>
            <Link to="/admin/results" className="btn btn-outline flex-1 text-center">Manage Results</Link>
          </div>
        </div>
        
        {/* Recent Registrations */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Registrations</h2>
            <Link to="/admin/registrations" className="text-secondary font-semibold" style={{color: 'var(--secondary-color)'}}>View All</Link>
          </div>
          
          {recentRegistrations.length > 0 ? (
            <div className="table-container mb-0" style={{ boxShadow: 'none' }}>
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Event</th>
                    <th>Sport</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRegistrations.map(reg => (
                    <tr key={reg.id}>
                      <td className="font-semibold">{reg.studentName}</td>
                      <td>{reg.eventName}</td>
                      <td>{reg.sport}</td>
                      <td>{reg.registrationDate}</td>
                      <td><StatusBadge status={reg.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-light">
              No recent registrations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
