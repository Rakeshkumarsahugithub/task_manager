import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiSave, FiX, FiEdit, FiPlus, FiCheck } from 'react-icons/fi';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const res = await axios.get(`/api/tasks/${id}`);
        if (res.data) {
          setFormData({
            title: res.data.title,
            description: res.data.description || '',
            completed: res.data.completed || false
          });
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load task');
        console.error('Error fetching task:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      if (id) {
        await axios.patch(`/api/tasks/${id}`, formData);
      } else {
        await axios.post('/api/tasks', formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save task');
      console.error('Error saving task:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <div className="form-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>
          {id ? (
            <>
              <FiEdit style={{ marginRight: '10px' }} />
              Edit Task
            </>
          ) : (
            <>
              <FiPlus style={{ marginRight: '10px' }} />
              Create New Task
            </>
          )}
        </h2>
        <p>{id ? 'Update your task details' : 'Add a new task to your list'}</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
          />
        </div>
        
        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={(e) => setFormData({...formData, completed: e.target.checked})}
            style={{ marginRight: '10px', width: '18px', height: '18px' }}
          />
          <label htmlFor="completed" style={{ marginBottom: 0, cursor: 'pointer' }}>
            Mark as completed
          </label>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            <FiSave style={{ marginRight: '8px' }} />
            {loading ? 'Saving...' : (id ? 'Update Task' : 'Create Task')}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            <FiX style={{ marginRight: '8px' }} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;