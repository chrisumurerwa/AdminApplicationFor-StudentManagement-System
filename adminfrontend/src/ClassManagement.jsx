import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [classData, setClassData] = useState({ name: '', teacherId: '', schedule: '' });

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/classes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (err) {
      setClasses([
        { id: 1, name: 'Grade 10A', teacher: 'Mr. Smith', students: 30, schedule: 'Mon-Fri 8:00-14:00' },
        { id: 2, name: 'Grade 10B', teacher: 'Mrs. Johnson', students: 28, schedule: 'Mon-Fri 8:00-14:00' },
        { id: 3, name: 'Grade 9A', teacher: 'Mr. Williams', students: 32, schedule: 'Mon-Fri 8:00-14:00' }
      ]);
    }
  };

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/teachers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      }
    } catch (err) {
      setTeachers([
        { id: 1, name: 'Mr. Smith' },
        { id: 2, name: 'Mrs. Johnson' },
        { id: 3, name: 'Mr. Williams' }
      ]);
    }
  };

  const handleCreateClass = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_URL}/admin/classes`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(classData)
      });
      setShowModal(false);
      fetchClasses();
    } catch (err) {
      setShowModal(false);
    }
  };

  return (
    <div>
      <h1>Class Management</h1>

      <button className="btn" onClick={() => setShowModal(true)}>
        Create New Class
      </button>

      <div className="card" style={{ marginTop: '20px' }}>
        <table>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Teacher</th>
              <th>Students</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <tr key={cls.id}>
                <td>{cls.name}</td>
                <td>{cls.teacher}</td>
                <td>{cls.students}</td>
                <td>{cls.schedule}</td>
                <td>
                  <button className="btn-small btn-edit">Edit</button>
                  <button className="btn-small btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Class</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="form-group">
              <label>Class Name</label>
              <input
                type="text"
                value={classData.name}
                onChange={(e) => setClassData({ ...classData, name: e.target.value })}
                placeholder="e.g., Grade 10A"
              />
            </div>
            <div className="form-group">
              <label>Assign Teacher</label>
              <select
                value={classData.teacherId}
                onChange={(e) => setClassData({ ...classData, teacherId: e.target.value })}
              >
                <option value="">Select Teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Schedule</label>
              <input
                type="text"
                value={classData.schedule}
                onChange={(e) => setClassData({ ...classData, schedule: e.target.value })}
                placeholder="e.g., Mon-Fri 8:00-14:00"
              />
            </div>
            <button className="btn" onClick={handleCreateClass}>Create Class</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassManagement;
