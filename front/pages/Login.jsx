import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.jsx';

const Login = () => {
  // Starea pentru datele din input-uri, erori si loading
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth(); // Luam functia login din Context pentru a salva sesiunea
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenim refresh-ul standard al paginii
    setError(''); // Resetam erorile vechi
    setLoading(true); // Pornim spinner-ul
    
    try {
      const response = await api.post('/auth/login', formData); // Trimitem datele la backend
      login(response.user, response.token); 
      navigate('/'); // Redirectionam utilizatorul catre Dashboard
    } catch (err) {
      setError(err.message || 'Invalid email or password'); // Afisam eroarea primita
    } finally {
      setLoading(false); // Oprim spinner-ul indiferent de rezultat
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <div className="bg-blue-600 inline-flex p-4 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <i className="fa-solid fa-bug text-3xl text-white"></i>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Sign in to manage your software projects</p>
        </div>

        {/* Randare conditionala: Afisam cutia rosie doar daca exista o eroare */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="you@example.com"
                value={formData.email}
                // Actualizam starea pastrand restul obiectului neschimbat
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading} // Dezactivam butonul cat timp se incarca sa nu apese de 2 ori
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {/* Schimbam iconita dinamic: spinner daca incarca, sageata daca nu */}
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-right-to-bracket"></i>}
            Sign In
          </button>
        </form>

        <div className="text-center text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;