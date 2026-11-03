import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PATIENTS, INITIAL_DOCTORS } from '../data/mockData';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('carepulse_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default logged in as demo patient Alex Rivera for immediate interactivity
    return INITIAL_PATIENTS[0];
  });

  const [token, setToken] = useState(() => localStorage.getItem('carepulse_token') || 'demo_token_carepulse');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('carepulse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('carepulse_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('carepulse_token', token);
    } else {
      localStorage.removeItem('carepulse_token');
    }
  }, [token]);

  const login = async ({ email, password, role }) => {
    setLoading(true);
    try {
      // Attempt backend login first
      const res = await api.post('/auth/login', { email, password, role });
      if (res && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        return { success: true, user: res.user };
      }
    } catch (err) {
      console.warn('Backend login endpoint unavailable or rejected, checking local demo database:', err.message);
    }

    // Fallback local check
    const normalizedEmail = email.toLowerCase().trim();
    let foundUser = null;

    if (role === 'doctor') {
      foundUser = INITIAL_DOCTORS.find(d => d.email.toLowerCase() === normalizedEmail) || INITIAL_DOCTORS[0];
    } else {
      foundUser = INITIAL_PATIENTS.find(p => p.email.toLowerCase() === normalizedEmail);
      if (!foundUser) {
        // Create an ad-hoc patient session if not found
        foundUser = {
          id: `pat-${Date.now()}`,
          name: email.split('@')[0].replace('.', ' '),
          email: normalizedEmail,
          role: 'patient',
          phone: '+1 (555) 000-1122',
          age: 28,
          gender: 'Other'
        };
      }
    }

    const mockToken = `token_${foundUser.id}_${Date.now()}`;
    setUser(foundUser);
    setToken(mockToken);
    setLoading(false);
    return { success: true, user: foundUser };
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', userData);
      if (res && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        return { success: true, user: res.user };
      }
    } catch (err) {
      console.warn('Backend register failed, registering locally:', err.message);
    }

    const newUser = {
      id: `pat-${Date.now()}`,
      ...userData,
      role: 'patient'
    };
    const mockToken = `token_${newUser.id}_${Date.now()}`;
    setUser(newUser);
    setToken(mockToken);
    setLoading(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('carepulse_user');
    localStorage.removeItem('carepulse_token');
  };

  const quickLoginAs = (type = 'patient', docIndex = 0) => {
    if (type === 'doctor') {
      const doc = INITIAL_DOCTORS[docIndex] || INITIAL_DOCTORS[0];
      setUser(doc);
      setToken(`token_${doc.id}`);
    } else {
      setUser(INITIAL_PATIENTS[0]);
      setToken(`token_${INITIAL_PATIENTS[0].id}`);
    }
  };

  const updateProfile = (updatedData) => {
    setUser(prev => {
      const merged = { ...prev, ...updatedData };
      localStorage.setItem('carepulse_user', JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        quickLoginAs,
        updateProfile,
        isDoctor: user?.role === 'doctor',
        isPatient: user?.role === 'patient' || !user?.role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

