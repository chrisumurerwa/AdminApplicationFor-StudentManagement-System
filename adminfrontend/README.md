# School Management System - Admin Frontend

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Update API URL in components if needed (default: http://localhost:5000/api)

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Application will run on `http://localhost:5173`

## Features

### Admin Dashboard
- View statistics (students, teachers, fees, attendance)
- Recent activities overview

### User Management
- View all users (students, parents, teachers)
- Verify/reject device IDs
- Search and filter users
- Manage user accounts

### Fee Management
- View all fee transactions
- Approve refund requests
- Filter by transaction type and status

### Academic Management
- View student records
- Add grades and attendance
- Manage academic data

### Class Management
- Create and manage classes
- Assign teachers to classes
- Set schedules

## Default Login
- Email: admin@school.com
- Password: admin123

## Technology Stack
- React 19
- Vite
- CSS3
- Fetch API for HTTP requests

## Project Structure
```
src/
├── App.jsx              # Main application component
├── App.css              # Global styles
├── Login.jsx            # Login component
├── Dashboard.jsx        # Dashboard component
├── UserManagement.jsx   # User management component
├── FeeManagement.jsx    # Fee management component
├── AcademicManagement.jsx # Academic records component
└── ClassManagement.jsx  # Class management component
```

## Features Implemented
- JWT authentication
- Role-based access control
- Device verification system
- Fee payment tracking
- Academic records management
- Class and teacher management
- Responsive design
- Error handling
- Loading states
