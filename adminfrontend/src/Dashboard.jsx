import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalFees: 0,
    pendingVerifications: 0,
    attendanceRate: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      setStats({
        totalStudents: 450,
        totalTeachers: 35,
        totalFees: 125000,
        pendingVerifications: 12,
        attendanceRate: 92.5
      });
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="value">{stats.totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Total Teachers</h3>
          <div className="value">{stats.totalTeachers}</div>
        </div>
        <div className="stat-card">
          <h3>Total Fees Collected</h3>
          <div className="value">${stats.totalFees.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Verifications</h3>
          <div className="value">{stats.pendingVerifications}</div>
        </div>
        <div className="stat-card">
          <h3>Attendance Rate</h3>
          <div className="value">{stats.attendanceRate}%</div>
        </div>
      </div>

      <div className="card">
        <h2>Recent Activities</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Activity</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10:30 AM</td>
              <td>New student registration</td>
              <td>John Doe</td>
            </tr>
            <tr>
              <td>10:15 AM</td>
              <td>Fee payment received</td>
              <td>Jane Smith</td>
            </tr>
            <tr>
              <td>09:45 AM</td>
              <td>Grade updated</td>
              <td>Teacher Mike</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
