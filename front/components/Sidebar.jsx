
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/', icon: 'fa-solid fa-chart-line', label: 'Dashboard' },
    { path: '/my-bugs', icon: 'fa-solid fa-bug', label: 'My Reported Bugs' },
    { path: '/profile', icon: 'fa-solid fa-user-gear', label: 'Profile' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-blue-500 p-2 rounded-lg">
          <i className="fa-solid fa-bug text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Dual-Core</h1>
          <p className="text-xs text-slate-400">Bug Research Center</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <i className={item.icon}></i>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
            <i className="fa-solid fa-user text-slate-300"></i>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.username}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      <div className="p-6 text-xs text-slate-500 border-t border-slate-800">
        <p className="font-bold text-slate-400 mb-1">Developed by:</p>
        <p>Covrig Eduard-Gabriel</p>
        <p>Constantin Arthur-Stefan</p>
      </div>
    </aside>
  );
};

export default Sidebar;
