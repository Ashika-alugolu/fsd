import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SportsEvents from './pages/SportsEvents';
import EventDetails from './pages/EventDetails';
import StudentDashboard from './pages/StudentDashboard';
import MyEvents from './pages/MyEvents';
import Results from './pages/Results';
import AdminDashboard from './pages/AdminDashboard';
import ManageEvents from './pages/ManageEvents';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import Registrations from './pages/Registrations';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<SportsEvents />} />
            <Route path="/events/:id" element={<EventDetails />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/my-events" element={
              <ProtectedRoute allowedRole="student">
                <MyEvents />
              </ProtectedRoute>
            } />
            <Route path="/student/results" element={
              <ProtectedRoute allowedRole="student">
                <Results />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute allowedRole="admin">
                <ManageEvents />
              </ProtectedRoute>
            } />
            <Route path="/admin/events/add" element={
              <ProtectedRoute allowedRole="admin">
                <AddEvent />
              </ProtectedRoute>
            } />
            <Route path="/admin/events/edit/:id" element={
              <ProtectedRoute allowedRole="admin">
                <EditEvent />
              </ProtectedRoute>
            } />
            <Route path="/admin/registrations" element={
              <ProtectedRoute allowedRole="admin">
                <Registrations />
              </ProtectedRoute>
            } />
            <Route path="/admin/results" element={
              <ProtectedRoute allowedRole="admin">
                <Results />
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
