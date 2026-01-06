import React, { useState, useEffect } from 'react';
import { api } from '../services/api.jsx';

const MyBugs = () => {
  // Starea locala pentru lista de bug-uri si indicatorul de incarcare
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBugs(); // Se apeleaza o singura data cand componenta se monteaza pe ecran
  }, []);

  const fetchMyBugs = async () => {
    try {
      // Facem request catre endpoint-ul care returneaza doar bug-urile userului curent
      const data = await api.get('/bugs/my-reported');
      setBugs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Ascundem spinner-ul indiferent daca avem date sau eroare
    }
  };

  // Daca datele inca se incarca, afisam doar spinner-ul si oprim randarea aici
  if (loading) return <div className="text-center py-20"><i className="fa-solid fa-spinner fa-spin text-4xl text-blue-500"></i></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Reported Bugs</h1>
        <p className="text-slate-500 mt-2">Issues you've discovered and submitted across all projects</p>
      </div>

      <div className="space-y-4">
        {/* Logica conditionala: Lista goala vs Lista cu date */}
        {bugs.length === 0 ? (
          // Cazul 1: Nu exista bug-uri (Afisam un mesaj)
          <div className="bg-white p-20 text-center rounded-3xl border border-slate-200 shadow-sm">
            <div className="bg-slate-50 inline-flex p-6 rounded-full mb-4">
              <i className="fa-solid fa-bug-slash text-5xl text-slate-300"></i>
            </div>
            <h2 className="text-xl font-bold text-slate-800">No bugs reported by you</h2>
            <p className="text-slate-500 mt-2">Good job! Start testing some projects to contribute.</p>
          </div>
        ) : (
          // Cazul 2: Avem bug-uri -> Le afisam folosind map()
          bugs.map((bug) => (
            <div key={bug.id_bug} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {/* Indicator vizual pentru status: pulseaza rosu daca e 'open', verde fix altfel */}
                  <div className={`w-3 h-3 rounded-full ${bug.status === 'open' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <h3 className="font-bold text-slate-900 text-lg">Project: {bug.project?.name}</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                  {new Date(bug.reported_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-700 mb-4">{bug.description}</p>
              
              <div className="flex items-center gap-4">
                {/* Schimbam culoarea etichetei in functie de severitatea bug-ului (rosu/portocaliu/galben) */}
                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-white ${
                  bug.severity === 'critical' ? 'bg-red-500' : 
                  bug.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                }`}>
                  {bug.severity}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <i className="fa-solid fa-code-commit"></i>
                  <span>Ref: {bug.commit_link}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBugs;