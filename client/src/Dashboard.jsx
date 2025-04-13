import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLogOut, FiPlus, FiCheck, FiTrash2, FiEdit, FiList, FiLoader } from 'react-icons/fi';

const Dashboard = ({ logout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks');
        setTasks(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const res = await axios.patch(`/api/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Task Manager</h1>
        <button className="btn btn-logout" onClick={handleLogout}>
          <FiLogOut style={{ marginRight: '8px'}} />
          Logout
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <Link to="/add-task" className="btn btn-primary">
        <FiPlus style={{ marginRight: '8px' }} />
        Add New Task
      </Link>
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <FiList className="empty-state-icon" />
          <h3>No Tasks Found</h3>
          <p>Get started by adding your first task</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
              </div>
              <div className="task-actions">
                <button 
                  className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                  title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  <FiCheck />
                </button>
                <Link 
                  to={`/edit-task/${task._id}`} 
                  className="btn btn-primary"
                  title="Edit task"
                >
                  <FiEdit />
                </Link>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(task._id)}
                  title="Delete task"
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;