# School Management System - Admin Application

Complete admin management system for school operations including user verification, fee management, academic records, and class management.

## Project Structure

```
AdminApplications/
├── adminbackend/          # Backend API (Node.js/Express)
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   ├── server.js         # Main server file
│   ├── package.json
│   └── README.md
│
└── adminfrontend/        # Frontend (React/Vite)
    ├── src/
    │   ├── App.jsx       # Main app component
    │   ├── Login.jsx     # Login component
    │   ├── Dashboard.jsx # Dashboard
    │   ├── UserManagement.jsx
    │   ├── FeeManagement.jsx
    │   ├── AcademicManagement.jsx
    │   └── ClassManagement.jsx
    ├── package.json
    └── README.md
```

## Quick Start

### Backend Setup

```bash
cd adminbackend
npm install
cp .env.example .env
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd adminfrontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Default Admin Credentials

- **Email:** admin@school.com
- **Password:** admin123

## Core Features

### Authentication & Security
- JWT-based authentication
- SHA-512 password hashing
- Device ID verification system
- Session management
- Rate limiting
- Helmet security headers

### User Management
- View all users (students, parents, teachers)
- Verify/reject device IDs
- Search and filter functionality
- Role-based access control

### Fee Management
- View all transactions
- Approve refund requests
- Filter by type and status
- Payment history tracking

### Academic Management
- Student records
- Grade management
- Attendance tracking
- Academic performance overview

### Class Management
- Create and manage classes
- Assign teachers
- Schedule management
- Student enrollment

## Technology Stack

### Backend
- Node.js
- Express.js
- JWT for authentication
- Helmet for security
- Express Rate Limit
- CORS

### Frontend
- React 19
- Vite
- CSS3
- Fetch API

## API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login

### Admin Routes (Protected)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - All users
- `PUT /api/admin/users/:id/verify` - Verify user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/fees` - Fee transactions
- `PUT /api/admin/fees/:id/approve` - Approve refund
- `GET /api/admin/classes` - All classes
- `POST /api/admin/classes` - Create class
- `GET /api/admin/students` - All students
- `POST /api/admin/students/:id/grades` - Add grade
- `GET /api/admin/teachers` - All teachers

## Security Features

- JWT authentication with 8-hour expiry
- SHA-512 password hashing
- HTTP security headers (Helmet)
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation
- Secure session management

## Development Notes

- Backend uses in-memory storage (replace with database in production)
- Frontend includes demo mode fallback
- All sensitive data should be in environment variables
- Follow the existing code structure for new features

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Real-time notifications
- Advanced reporting
- Email notifications
- File upload for documents
- Bulk operations
- Export functionality
- Mobile app version

## License

Private - School Management System
