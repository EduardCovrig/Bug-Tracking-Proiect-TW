
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bugs');
  const [showBugForm, setShowBugForm] = useState(false);
  const [bugData, setBugData] = useState({
    description: '', severity: 'low', priority: 'low', commit_link: '', id_project: id
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [proj, mbars, allBugs] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/members/project/${id}`),
        api.get('/bugs')
      ]);
      setProject(proj);
      setMembers(mbars);
      setBugs(allBugs.filter(b => b.id_project === id));
    } catch (err) {
      console.error(err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleReportBug = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bugs', bugData);
      setShowBugForm(false);
      setBugData({ description: '', severity: 'low', priority: 'low', commit_link: '', id_project: id });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this project forever?')) {
      try {
        await api.delete(`/projects/${id}`);
        navigate('/');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const getSeverityColor = (s) => {
    switch(s) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  if (loading) return <div className="text-center py-20"><i className="fa-solid fa-spinner fa-spin text-4xl text-blue-500"></i></div>;

  const isCreator = project.created_by === user.id_user;
  const isMember = members.some(m => m.id_user === user.id_user);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg">
              <i className="fa-solid fa-code text-2xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">{project.name}</h1>
              <a href={project.repository} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm flex items-center gap-1">
                <i className="fa-brands fa-github"></i>
                {project.repository}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            {!isMember && (
              <button 
                onClick={async () => {
                  try {
                    await api.post('/members', { id_project: id, id_user: user.id_user, role: 'TST' });
                    fetchData();
                  } catch(e) { alert("Only PMs can add members, or you are already one."); }
                }}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all text-sm"
              >
                Join as Tester
              </button>
            )}
            {isCreator && (
              <button onClick={handleDelete} className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all text-sm">
                Delete Project
              </button>
            )}
          </div>
        </div>
        <p className="mt-6 text-slate-600 leading-relaxed max-w-3xl">
          {project.description || 'No description provided.'}
        </p>
      </div>

      <div className="flex border-b border-slate-200 gap-8 px-2">
        <button
          onClick={() => setActiveTab('bugs')}
          className={`pb-4 px-2 font-bold transition-all border-b-2 ${activeTab === 'bugs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Reported Bugs ({bugs.length})
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`pb-4 px-2 font-bold transition-all border-b-2 ${activeTab === 'members' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Project Members ({members.length})
        </button>
      </div>

      {activeTab === 'bugs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Issue Tracker</h2>
            <button
              onClick={() => setShowBugForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-md"
            >
              <i className="fa-solid fa-bug"></i>
              Report Bug
            </button>
          </div>

          <div className="grid gap-4">
            {bugs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-dashed border-slate-300">
                <i className="fa-solid fa-check-circle text-4xl text-green-400 mb-2"></i>
                <p className="text-slate-500 font-medium">No bugs reported yet. Clean project!</p>
              </div>
            ) : (
              bugs.map((bug) => (
                <div key={bug.id_bug} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase text-white ${getSeverityColor(bug.severity)}`}>
                        {bug.severity}
                      </span>
                      <span className="text-xs font-bold text-slate-400">#{bug.id_bug.slice(0, 8)}</span>
                    </div>
                    <p className="text-slate-800 font-medium mb-3">{bug.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-code-commit text-slate-400"></i>
                        {bug.commit_link}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-user-tag text-slate-400"></i>
                        By {bug.reporter?.username}
                      </span>
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${bug.status === 'open' ? 'text-red-600 border-red-200 bg-red-50' : 'text-green-600 border-green-200 bg-green-50'}`}>
                        {bug.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {isMember && bug.status === 'open' && (
                    <button 
                      onClick={async () => {
                        await api.put(`/bugs/${bug.id_bug}`, { status: 'resolved' });
                        fetchData();
                      }}
                      className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-all"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div key={m.id_user} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                  {m.user?.username.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{m.user?.username}</p>
                  <p className="text-xs text-slate-400">{m.user?.email}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${m.role === 'PM' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                {m.role}
              </span>
            </div>
          ))}
        </div>
      )}

      {showBugForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Report a Bug</h2>
            <form onSubmit={handleReportBug} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  required
                  className="w-full px-4 py-2 border rounded-xl h-24 resize-none"
                  value={bugData.description}
                  onChange={(e) => setBugData({ ...bugData, description: e.target.value })}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Severity</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl bg-white"
                    value={bugData.severity}
                    onChange={(e) => setBugData({ ...bugData, severity: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Priority</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl bg-white"
                    value={bugData.priority}
                    onChange={(e) => setBugData({ ...bugData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Commit Link / Reference</label>
                <input
                  required
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="e.g. main/commit/12345"
                  value={bugData.commit_link}
                  onChange={(e) => setBugData({ ...bugData, commit_link: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowBugForm(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
