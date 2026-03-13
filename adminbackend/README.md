# School Management System - Admin Backend

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login

### Admin Routes (Requires JWT Token)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/verify` - Verify user device
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/fees` - Get all fee transactions
- `PUT /api/admin/fees/:id/approve` - Approve refund
- `GET /api/admin/classes` - Get all classes
- `POST /api/admin/classes` - Create new class
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students/:id/grades` - Add grade to student
- `GET /api/admin/teachers` - Get all teachers

## Default Admin Credentials
- Email: admin@school.com
- Password: admin123

## Security Features
- JWT authentication
- SHA-512 password hashing
- Helmet for HTTP headers security
- Rate limiting
- CORS enabled
- Input validation

## Technology Stack
- Node.js
- Express.js
- JWT for authentication
- Helmet for security
- Express Rate Limit
