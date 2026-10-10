import React, { useState, useEffect } from 'react';

const Results = () => {
  const [results, setResults] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({ winner: '', runnerUp: '' });
  
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    loadData();
  }, [user.id]);

  const loadData = () => {
    const allResults = JSON.parse(localStorage.getItem('results')) || [];
    
    if (isAdmin) {
      const allEvents = JSON.parse(localStorage.getItem('events')) || [];
      const completed = allEvents.filter(e => e.status === 'Completed');
      setCompletedEvents(completed);
      
      const mappedResults = completed.map(ev => {
        const res = allResults.find(r => r.eventId === ev.id);
        return {
          ...ev,
          hasResult: !!res,
          winner: res ? res.winner : '-',
          runnerUp: res ? res.runnerUp : '-'
        };
      });
      setResults(mappedResults);
    } else {
      const allRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
      const userRegs = allRegistrations.filter(r => r.studentId === user.id);
      
      const enrichedResults = allResults.map(res => {
        const userReg = userRegs.find(r => r.eventId === res.eventId);
        return {
          ...res,
          yourResult: userReg ? userReg.result : 'Not Participated'
        };
      });
      setResults(enrichedResults);
    }
  };

  const handleDeclare = (event) => {
    setCurrentEvent(event);
    setFormData({ winner: event.winner !== '-' ? event.winner : '', runnerUp: event.runnerUp !== '-' ? event.runnerUp : '' });
    setShowModal(true);
  };

  const handleSaveResult = (e) => {
    e.preventDefault();
    const allResults = JSON.parse(localStorage.getItem('results')) || [];
    const index = allResults.findIndex(r => r.eventId === currentEvent.id);
    
    const newResult = {
      eventId: currentEvent.id,
      eventName: currentEvent.name,
      sport: currentEvent.sport,
      winner: formData.winner,
      runnerUp: formData.runnerUp,
      status: 'Completed'
    };
    
    if (index >= 0) {
      allResults[index] = newResult;
    } else {
      allResults.push(newResult);
    }
    
    localStorage.setItem('results', JSON.stringify(allResults));
    setShowModal(false);
    loadData();
  };

  return (
    <div className="page-container container">
      <h1 className="text-3xl font-bold mb-6">{isAdmin ? 'Manage Event Results' : 'Event Results'}</h1>
      
      {isAdmin ? (
        <div className="card">
          <div className="table-container mb-0" style={{ boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Sport</th>
                  <th>Winner</th>
                  <th>Runner-up</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 ? results.map(res => (
                  <tr key={res.id}>
                    <td className="font-semibold">{res.name}</td>
                    <td>{res.sport}</td>
                    <td>{res.winner}</td>
                    <td>{res.runnerUp}</td>
                    <td>{res.hasResult ? <span className="text-success font-semibold" style={{color: 'var(--success)'}}>Declared</span> : <span className="text-warning" style={{color: 'var(--warning)'}}>Pending</span>}</td>
                    <td>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }} onClick={() => handleDeclare(res)}>
                        {res.hasResult ? 'Update' : 'Declare Result'}
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No completed events found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Student View */
        results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
            {results.map((res, idx) => (
              <div key={idx} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-light font-semibold mb-1 block">{res.sport}</span>
                    <h3 className="text-xl font-bold">{res.eventName}</h3>
                  </div>
                  <span className="badge badge-completed">Completed</span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4" style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                  <div className="flex justify-between mb-2">
                    <span className="text-light">Winner:</span>
                    <span className="font-bold flex items-center gap-2">🥇 {res.winner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light">Runner-up:</span>
                    <span className="font-semibold flex items-center gap-2">🥈 {res.runnerUp}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-light font-semibold">Your Result:</span>
                  <span className={`font-bold ${res.yourResult === 'Winner' ? 'text-success' : res.yourResult === 'Runner-up' ? 'text-accent' : ''}`}
                    style={{ 
                      color: res.yourResult === 'Winner' ? 'var(--success)' : 
                             res.yourResult === 'Runner-up' ? 'var(--accent-color)' : 'inherit' 
                    }}
                  >
                    {res.yourResult}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-xl text-light">No results declared yet.</p>
          </div>
        )
      )}

      {/* Admin Modal */}
      {showModal && isAdmin && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
            <h3 className="text-xl font-bold mb-4">Declare Result: {currentEvent?.name}</h3>
            <form onSubmit={handleSaveResult}>
              <div className="form-group">
                <label>Winner</label>
                <input type="text" value={formData.winner} onChange={(e) => setFormData({...formData, winner: e.target.value})} required placeholder="Student or Team Name" />
              </div>
              <div className="form-group">
                <label>Runner-up</label>
                <input type="text" value={formData.runnerUp} onChange={(e) => setFormData({...formData, runnerUp: e.target.value})} required placeholder="Student or Team Name" />
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary flex-1">Save Result</button>
                <button type="button" className="btn btn-outline flex-1" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
