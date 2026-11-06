// API service layer for CarePulse
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('carepulse_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  async get(endpoint) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`API GET ${endpoint} unavailable, using local state:`, err.message);
      return null;
    }
  },

  async post(endpoint, data) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`API POST ${endpoint} failed:`, err.message);
      throw err;
    }
  },

  async put(endpoint, data) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`API PUT ${endpoint} failed:`, err.message);
      throw err;
    }
  },

  async delete(endpoint) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`API DELETE ${endpoint} failed:`, err.message);
      throw err;
    }
  }
};

