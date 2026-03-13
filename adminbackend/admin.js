import express from 'express';
import { authMiddleware } from './authMiddleware.js';

const router = express.Router();

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', deviceId: 'device123', verified: false },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'parent', deviceId: 'device456', verified: true },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'teacher', deviceId: 'device789', verified: true },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'student', deviceId: 'device101', verified: false }
];

let transactions = [
  { id: 1, studentName: 'John Doe', type: 'deposit', amount: 500, date: '2024-01-15', status: 'completed' },
  { id: 2, studentName: 'Jane Smith', type: 'deposit', amount: 750, date: '2024-01-14', status: 'completed' },
  { id: 3, studentName: 'Mike Johnson', type: 'withdraw', amount: 100, date: '2024-01-13', status: 'pending' },
  { id: 4, studentName: 'Sarah Williams', type: 'deposit', amount: 600, date: '2024-01-12', status: 'completed' }
];

let classes = [
  { id: 1, name: 'Grade 10A', teacher: 'Mr. Smith', students: 30, schedule: 'Mon-Fri 8:00-14:00' },
  { id: 2, name: 'Grade 10B', teacher: 'Mrs. Johnson', students: 28, schedule: 'Mon-Fri 8:00-14:00' },
  { id: 3, name: 'Grade 9A', teacher: 'Mr. Williams', students: 32, schedule: 'Mon-Fri 8:00-14:00' }
];

let students = [
  { id: 1, name: 'John Doe', class: 'Grade 10A', attendance: 95, grades: [{ subject: 'Math', grade: 'A' }] },
  { id: 2, name: 'Jane Smith', class: 'Grade 10B', attendance: 92, grades: [{ subject: 'Science', grade: 'B+' }] },
  { id: 3, name: 'Mike Johnson', class: 'Grade 9A', attendance: 88, grades: [{ subject: 'English', grade: 'A-' }] }
];

router.use(authMiddleware);

router.get('/stats', (req, res) => {
  res.json({
    totalStudents: 450,
    totalTeachers: 35,
    totalFees: 125000,
    pendingVerifications: users.filter(u => !u.verified).length,
    attendanceRate: 92.5
  });
});

router.get('/users', (req, res) => {
  res.json(users);
});

router.put('/users/:id/verify', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  user.verified = true;
  res.json({ message: 'User verified successfully', user });
});

router.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id !== userId);
  res.json({ message: 'User deleted successfully' });
});

router.get('/fees', (req, res) => {
  res.json(transactions);
});

router.put('/fees/:id/approve', (req, res) => {
  const transactionId = parseInt(req.params.id);
  const transaction = transactions.find(t => t.id === transactionId);
  
  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }
  
  transaction.status = 'completed';
  res.json({ message: 'Refund approved', transaction });
});

router.get('/classes', (req, res) => {
  res.json(classes);
});

router.post('/classes', (req, res) => {
  const { name, teacherId, schedule } = req.body;
  const newClass = {
    id: classes.length + 1,
    name,
    teacher: `Teacher ${teacherId}`,
    students: 0,
    schedule
  };
  classes.push(newClass);
  res.status(201).json(newClass);
});

router.get('/students', (req, res) => {
  res.json(students);
});

router.post('/students/:id/grades', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  const { subject, grade, term } = req.body;
  student.grades.push({ subject, grade, term });
  res.json({ message: 'Grade added successfully', student });
});

router.get('/teachers', (req, res) => {
  res.json([
    { id: 1, name: 'Mr. Smith' },
    { id: 2, name: 'Mrs. Johnson' },
    { id: 3, name: 'Mr. Williams' }
  ]);
});

export default router;
