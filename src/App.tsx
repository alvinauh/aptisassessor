import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Speaking from './components/Speaking';
import Listening from './components/Listening';
import Reading from './components/Reading';
import Writing from './components/Writing';
import AdminDashboard from './components/AdminDashboard';
import UserProgress from './components/UserProgress';
import ErrorBoundary from './components/ErrorBoundary';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login setUser={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
            />
            <Route
              path="/speaking"
              element={user ? <Speaking user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/listening"
              element={user ? <Listening user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/reading"
              element={user ? <Reading user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/writing"
              element={user ? <Writing user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/progress"
              element={user ? <UserProgress user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
            />
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;