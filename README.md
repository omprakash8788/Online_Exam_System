#  Mock Test Web Application (Online Exam System)

A scalable, secure, and responsive Mock Test / Online Examination Platform designed to simulate real competitive exams.  
This application enables users to attempt timed mock tests, track performance, and view detailed results, while providing admins full control over test and question management.


--
## Project Overview
The Mock Test Web Application is built with a clean separation of concerns between frontend and backend, following industry best practices such as modular architecture, RESTful APIs, JWT-based authentication, and responsive UI design.

This project is suitable for real-world production use and future scalability.

---

## Suitable For

- Competitive exam preparation platforms  
- Educational institutions  
- Online assessment systems  
- Interview & skill evaluation platforms  

---

##  Key Features

###  User Module

- Secure authentication (Signup / Login / Logout)
- User dashboard with test statistics and history
- Browse mock tests by category
- Timed exam interface with auto-submit
- Question navigation with review/mark flags
- Real-time progress tracking
- Result summary with detailed score breakdown

---

### 🛠 Admin Module

- Create, update, and delete mock tests
- Manage questions and answer options
- Control exam duration and test rules
- View user performance and analytics
- Scalable question bank management

---

##  UI / UX

- Pixel-perfect UI implemented from Figma designs
- Fully responsive (Desktop / Tablet / Mobile)
- Clean, accessible, and user-friendly interface
- Consistent color system and typography
- Optimized exam-taking experience

---
## Technology Stack
- Frontend
- React.js
- TypeScript
- Tailwind CSS / Material UI
- Axios / Fetch API
  
## Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## Tooling & Design
- Figma (UI/UX Design)
- Git & GitHub
- Postman (API Testing)

## Security & Best Practices
- JWT-based authentication
- Secure password hashing
- Protected routes
- Environment-based configuration
- Modular and maintainable codebase

## Future Enhancements
- Admin analytics dashboard
- Role-based access control (RBAC)
- Question difficulty analysis
- Performance charts & reports
- Payment integration for premium tests
- Online proctoring (camera & tab-switch detection)

## Contribution Guidelines
- Fork the repository
- Create a feature branch
- Commit changes with meaningful messages
- Open a Pull Request
- All contributions are reviewed before merge


## 📁 Repository Structure

```bash
Online_Exam_System/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── App.tsx
│
├── README.md
└── .gitignore
