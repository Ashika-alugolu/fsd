import React, { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = () => {
    const allRegs = JSON.parse(localStorage.getItem('registrations')) || [];
    setRegistrations(allRegs.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)));
  };

  const handleStatusChange = (id, newStatus) => {
    const allRegs = [...registrations];
    const index = allRegs.findIndex(r => r.id === id);
    if (index >= 0) {
      allRegs[index].status = newStatus;
      localStorage.setItem('registrations', JSON.stringify(allRegs));
      setRegistrations(allRegs);
    }
  };

  const handleResultChange = (id, newResult) => {
    const allRegs = [...registrations];
    const index = allRegs.findIndex(r => r.id === id);
    if (index >= 0) {
      allRegs[index].result = newResult;
      localStorage.setItem('registrations', JSON.stringify(allRegs));
      setRegistrations(allRegs);
    }
  };

  const statusOptions = ['Registered', 'Approved', 'Rejected', 'Completed'];
  const resultOptions = ['Not Declared', 'Winner', 'Runner-up', 'Participant'];

  return (
    <div className="page-container container">
      <h1 className="text-3xl font-bold mb-6">Student Registrations</h1>

      <div className="card">
        <div className="table-container mb-0" style={{ boxShadow: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Event</th>
                <th>Sport</th>
                <th>Date</th>
                <th>Status</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length > 0 ? (
                registrations.map(reg => (
                  <tr key={reg.id}>
                    <td>
                      <div className="font-semibold">{reg.studentName}</div>
                      <div className="text-sm text-light">{reg.studentEmail}</div>
                    </td>
                    <td className="font-semibold">{reg.eventName}</td>
                    <td>{reg.sport}</td>
                    <td>{reg.registrationDate}</td>
                    <td>
                      <select 
                        value={reg.status} 
                        onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                        style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      >
                        {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </td>
                    <td>
                      <select 
                        value={reg.result} 
                        onChange={(e) => handleResultChange(reg.id, e.target.value)}
                        style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                        disabled={reg.status !== 'Completed'}
                      >
                        {resultOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6">No registrations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registrations;
