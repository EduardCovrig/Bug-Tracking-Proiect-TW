
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import Profile from './pages/Profile.jsx';
import MyBugs from './pages/MyBugs.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/projects/:id" element={
            <ProtectedRoute>
              <Layout><ProjectDetails /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/my-bugs" element={
            <ProtectedRoute>
              <Layout><MyBugs /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout><Profile /></Layout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
