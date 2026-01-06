import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.jsx';

const Profile = () => {
  // Luam datele curente si functia de update din Context
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Cand pagina se incarca si avem userul, pre-completam formularul cu datele existente
    if (user) setFormData({ username: user.username, email: user.email, password: '' });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    try {
      // Pregatim datele pentru trimitere
      const updateData = { username: formData.username, email: formData.email };
      // Adaugam parola la request DOAR daca utilizatorul a scris ceva in camp (nu vrem sa o resetam daca e goala)
      if (formData.password) updateData.password = formData.password;
      
      // Trimitem cererea de tip PUT catre backend
      const updatedUser = await api.put(`/users/${user.id_user}`, updateData);
      
      //Actualizam datele si in Contextul aplicatiei ca sa se vada modificarile instant in toata pagina
      login(updatedUser, localStorage.getItem('token'));
      
      setSuccess('Profile updated successfully!');
      // Resetam campul de parola dupa salvare pentru securitate
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Account Settings</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-6 mb-8">
          {/* Avatar generat automat din prima litera a username-ului */}
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl text-blue-600 font-bold border-2 border-blue-50">
            {user?.username?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user?.username}</h2>
            <p className="text-slate-500">System ID: {user?.id_user}</p>
          </div>
        </div>

        {/* Mesaj de succes care apare doar dupa salvare */}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3">
            <i className="fa-solid fa-circle-check text-green-500"></i>
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Display Name</label>
              <input
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">New Password (leave empty to keep current)</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving Changes...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;