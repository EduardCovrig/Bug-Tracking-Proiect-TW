import './App.css';
import Sidebar from './components/sidebar.js'
import '@fortawesome/fontawesome-free/css/all.min.css'; //iconite



function App() {
  return (
    <div className="app-container">
      <Sidebar />           
      <div className="main-content">
        Welcome to Dual-Core Bug Research Center
      </div>
    </div>
  )
};

export default App;
