import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function AcademicManagement() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gradeData, setGradeData] = useState({ subject: '', grade: '', term: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (err) {
      setStudents([
        { id: 1, name: 'John Doe', class: 'Grade 10A', attendance: 95, grades: [{ subject: 'Math', grade: 'A' }] },
        { id: 2, name: 'Jane Smith', class: 'Grade 10B', attendance: 92, grades: [{ subject: 'Science', grade: 'B+' }] },
        { id: 3, name: 'Mike Johnson', class: 'Grade 9A', attendance: 88, grades: [{ subject: 'English', grade: 'A-' }] }
      ]);
    }
  };

  const handleAddGrade = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_URL}/admin/students/${selectedStudent.id}/grades`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gradeData)
      });
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      setShowModal(false);
    }
  };

  return (
    <div>
      <h1>Academic Management</h1>

      <div className="card">
        <h2>Students Academic Records</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.attendance}%</td>
                <td>
                  <button 
                    className="btn-small btn-edit"
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowModal(true);
                    }}
                  >
                    Add Grade
                  </button>
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
              <h3>Add Grade for {selectedStudent?.name}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={gradeData.subject}
                onChange={(e) => setGradeData({ ...gradeData, subject: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Grade</label>
              <input
                type="text"
                value={gradeData.grade}
                onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Term</label>
              <select
                value={gradeData.term}
                onChange={(e) => setGradeData({ ...gradeData, term: e.target.value })}
              >
                <option value="">Select Term</option>
                <option value="1">Term 1</option>
                <option value="2">Term 2</option>
                <option value="3">Term 3</option>
              </select>
            </div>
            <button className="btn" onClick={handleAddGrade}>Add Grade</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AcademicManagement;
