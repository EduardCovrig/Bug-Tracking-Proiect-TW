import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(); // 1. Facem un context gol pentru datele de auth

export const AuthProvider = ({ children }) => {
  // Definim starea globala: user-ul, token-ul și starea de încărcare
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Luam token-ul direct din memorie daca exista
  const [loading, setLoading] = useState(true);

  useEffect(() => { // Functia ruleaza la refresh pentru a nu deloga user-ul
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser)); // Restauram datele user-ului
    }
    setLoading(false); // Am terminat verificarea, aplicatia poate porni
  }, [token]);

  const login = (userData, userToken) => { // Functia de Login
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => { // Functia de Logout:
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    // Facem datele disponibile pentru toata aplicatia
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom ca să folosim useAuth() în alte fișiere
export const useAuth = () => useContext(AuthContext);