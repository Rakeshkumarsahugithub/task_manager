import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Components
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import TaskForm from './TaskForm';

// Set base URL for axios
axios.defaults.baseURL = 'https://task-manager-pifr.onrender.com';

const App = () => {
  const [user, setUser] = useState(null);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user data
      const fetchUser = async () => {
        try {
          const res = await axios.get('/api/tasks');
          setUser({ token });
        } catch (err) {
          localStorage.removeItem('token');
        }
      };
      fetchUser();
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Registration failed' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={!user ? <Login login={login} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register register={register} /> : <Navigate to="/" />} />
          <Route
            path="/"
            element={user ? <Dashboard logout={logout} /> : <Navigate to="/login" />}
          />
          <Route path="/add-task" element={user ? <TaskForm /> : <Navigate to="/login" />} />
          <Route path="/edit-task/:id" element={user ? <TaskForm /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

