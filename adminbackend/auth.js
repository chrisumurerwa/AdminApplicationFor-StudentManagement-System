import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'admin-secret-key-change-in-production';

const admins = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@school.com',
    password: crypto.createHash('sha512').update('admin123').digest('hex'),
    role: 'admin'
  }
];

router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
  const admin = admins.find(a => a.email === email && a.password === hashedPassword);

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, { expiresIn: '8h' });

  res.json({
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
});

export default router;
