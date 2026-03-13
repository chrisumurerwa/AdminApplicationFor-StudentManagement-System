import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', deviceId: 'device123', verified: false },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'parent', deviceId: 'device456', verified: true },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'teacher', deviceId: 'device789', verified: true },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'student', deviceId: 'device101', verified: false }
      ]);
    }
  };

  const handleVerify = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/users/${userId}/verify`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        fetchUsers();
      }
    } catch (err) {
      setUsers(users.map(u => u.id === userId ? { ...u, verified: true } : u));
    }
  };

  const handleReject = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && !user.verified) ||
      (filter === 'verified' && user.verified) ||
      user.role === filter;
    
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <h1>User Management</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Users</option>
          <option value="pending">Pending Verification</option>
          <option value="verified">Verified</option>
          <option value="student">Students</option>
          <option value="parent">Parents</option>
          <option value="teacher">Teachers</option>
        </select>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Device ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.deviceId}</td>
                <td>
                  <span className={`badge ${user.verified ? 'verified' : 'pending'}`}>
                    {user.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td>
                  {!user.verified && (
                    <>
                      <button className="btn-small btn-approve" onClick={() => handleVerify(user.id)}>
                        Approve
                      </button>
                      <button className="btn-small btn-reject" onClick={() => handleReject(user.id)}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
