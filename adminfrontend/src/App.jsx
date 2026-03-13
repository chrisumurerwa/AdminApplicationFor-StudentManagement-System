import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import FeeManagement from './FeeManagement';
import AcademicManagement from './AcademicManagement';
import ClassManagement from './ClassManagement';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('adminData');
    if (token && admin) {
      setIsAuthenticated(true);
      setAdminData(JSON.parse(admin));
    }
  }, []);

  const handleLogin = (token, admin) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(admin));
    setIsAuthenticated(true);
    setAdminData(admin);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAuthenticated(false);
    setAdminData(null);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="admin-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>School Admin</h2>
          <p>{adminData?.name}</p>
        </div>
        <ul className="nav-menu">
          <li className={currentView === 'dashboard' ? 'active' : ''} onClick={() => setCurrentView('dashboard')}>
            Dashboard
          </li>
          <li className={currentView === 'users' ? 'active' : ''} onClick={() => setCurrentView('users')}>
            User Management
          </li>
          <li className={currentView === 'fees' ? 'active' : ''} onClick={() => setCurrentView('fees')}>
            Fee Management
          </li>
          <li className={currentView === 'academic' ? 'active' : ''} onClick={() => setCurrentView('academic')}>
            Academic Records
          </li>
          <li className={currentView === 'classes' ? 'active' : ''} onClick={() => setCurrentView('classes')}>
            Class Management
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
      <main className="main-content">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'users' && <UserManagement />}
        {currentView === 'fees' && <FeeManagement />}
        {currentView === 'academic' && <AcademicManagement />}
        {currentView === 'classes' && <ClassManagement />}
      </main>
    </div>
  );
}

export default App;
