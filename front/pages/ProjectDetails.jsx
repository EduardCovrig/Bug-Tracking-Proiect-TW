import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State-uri pentru date
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State-uri pentru UI
  const [activeTab, setActiveTab] = useState('bugs');
  const [showBugForm, setShowBugForm] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  
  // State-uri pentru Formulare
  const [bugData, setBugData] = useState({
    description: '', severity: 'low', priority: 'low', commit_link: '', id_project: id
  });
  const [resolveData, setResolveData] = useState({
    id_bug: null,
    resolved_commit: ''
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
      // Filtram bug-urile doar pentru acest proiect
      setBugs(allBugs.filter(b => b.id_project === id));
    } catch (err) {
      console.error(err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  // --- LOGICA MEMBRI ---

  // Determinam statutul utilizatorului curent
  const currentMemberRecord = members.find(m => m.id_user === user.id_user);
  const isMember = !!currentMemberRecord;
  const isPm = currentMemberRecord?.role === 'PM';
  const isTester = currentMemberRecord?.role === 'TST';

  const handleJoinAsTester = async () => {
    try {
      // Trimitem explicit id_user si role TST pentru a trece de verificarea din backend
      await api.post('/members', { 
        id_project: id, 
        id_user: user.id_user, 
        role: 'TST' 
      });
      fetchData();
    } catch(e) { 
      alert(e.message); 
    }
  };

  const handleLeaveProject = async () => {
    if(!window.confirm("Are you sure you want to leave this project?")) return;
    try {
      await api.delete(`/members/${user.id_user}/${id}`);
      fetchData();
    } catch(e) {
      alert(e.message);
    }
  };

  // --- LOGICA BUG-URI ---

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

  const handleAssignToMe = async (bugId) => {
    try {
      // Backendul se asteapta la PUT /bugs/:id cu assigned_to
      await api.put(`/bugs/${bugId}`, { assigned_to: user.id_user, status: 'in_progress' });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const openResolveModal = (bugId) => {
    setResolveData({ id_bug: bugId, resolved_commit: '' });
    setShowResolveModal(true);
  };

  const handleResolveBug = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/bugs/${resolveData.id_bug}`, { 
        status: 'resolved',
        resolved_commit: resolveData.resolved_commit
      });
      setShowResolveModal(false);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProject = async () => {
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

  return (
    <div className="space-y-6">
      {/* HEADER PROIECT */}
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
            {/* LOGICA BUTOANE JOIN / LEAVE */}
            {!isMember && (
              <button 
                onClick={handleJoinAsTester}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all text-sm"
              >
                Join as Tester
              </button>
            )}

            {isTester && (
              <button 
                onClick={handleLeaveProject}
                className="bg-orange-50 text-orange-600 px-5 py-2.5 rounded-xl font-bold hover:bg-orange-100 transition-all text-sm"
              >
                Leave Project
              </button>
            )}

            {isPm && (
               <div className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm border border-blue-100">
                 You are Project Manager
               </div>
            )}

            {isPm && (
              <button onClick={handleDeleteProject} className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all text-sm">
                Delete Project
              </button>
            )}
          </div>
        </div>
        <p className="mt-6 text-slate-600 leading-relaxed max-w-3xl">
          {project.description || 'No description provided.'}
        </p>
      </div>

      {/* TABS */}
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

      {/* BUG LIST SECTION */}
      {activeTab === 'bugs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Issue Tracker</h2>
            {/* DOAR MEMBRII POT RAPORTA BUGURI */}
            {isMember && (
              <button
                onClick={() => setShowBugForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-md"
              >
                <i className="fa-solid fa-bug"></i>
                Report Bug
              </button>
            )}
          </div>

          <div className="grid gap-4">
            {bugs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-dashed border-slate-300">
                <i className="fa-solid fa-check-circle text-4xl text-green-400 mb-2"></i>
                <p className="text-slate-500 font-medium">No bugs reported yet.</p>
              </div>
            ) : (
              bugs.map((bug) => (
                <div key={bug.id_bug} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase text-white ${getSeverityColor(bug.severity)}`}>
                        {bug.severity}
                      </span>
                      <span className="text-xs font-bold text-slate-400">#{bug.id_bug.slice(0, 8)}</span>
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold 
                        ${bug.status === 'open' ? 'text-red-600 border-red-200 bg-red-50' : 
                          bug.status === 'in_progress' ? 'text-blue-600 border-blue-200 bg-blue-50' :
                          'text-green-600 border-green-200 bg-green-50'}`}>
                        {bug.status.toUpperCase().replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium mb-3">{bug.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-code-commit text-slate-400"></i>
                        Bug Ref: {bug.commit_link}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-user-tag text-slate-400"></i>
                        Reported by: {bug.reporter?.username || 'Unknown'}
                      </span>
                      {bug.assigned_to && (
                        <span className="flex items-center gap-1 text-blue-600 font-semibold">
                          <i className="fa-solid fa-user-gear"></i>
                          Assigned to: {bug.assignee?.username || 'Unknown'}
                        </span>
                      )}
                      {bug.resolved_commit && (
                         <span className="flex items-center gap-1 text-green-600 font-semibold">
                         <i className="fa-solid fa-check"></i>
                         Fix Commit: {bug.resolved_commit}
                       </span>
                      )}
                    </div>
                  </div>

                  {/* ACTIUNI PE BUG (Doar pentru membri) */}
                  {isMember && bug.status !== 'resolved' && bug.status !== 'closed' && (
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      
                      {/* Buton Assign to Me (Daca nu e alocat nimanui) */}
                      {!bug.assigned_to && (
                        <button 
                          onClick={() => handleAssignToMe(bug.id_bug)}
                          className="text-xs font-bold text-slate-600 hover:bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                          <i className="fa-solid fa-hand-point-up"></i>
                          Assign to Me
                        </button>
                      )}

                      {/* Buton Resolve (Daca e alocat mie) */}
                      {bug.assigned_to === user.id_user && (
                         <button 
                         onClick={() => openResolveModal(bug.id_bug)}
                         className="text-xs font-bold text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg border border-green-200 transition-all flex items-center justify-center gap-2"
                       >
                         <i className="fa-solid fa-check"></i>
                         Mark Resolved
                       </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MEMBERS SECTION */}
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

      {/* MODAL REPORT BUG */}
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

      {/* MODAL RESOLVE BUG */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 text-green-600">Resolve Bug</h2>
            <p className="text-slate-500 mb-6 text-sm">Please provide the commit link where this bug was fixed.</p>
            
            <form onSubmit={handleResolveBug} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">Solution Commit Link</label>
                <input
                  required
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="https://github.com/.../commit/hash"
                  value={resolveData.resolved_commit}
                  onChange={(e) => setResolveData({ ...resolveData, resolved_commit: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowResolveModal(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold">Mark Resolved</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectDetails;