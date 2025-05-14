# VIT Verse

## 📌 Overview

**VIT Verse** is a centralized web portal designed to streamline the process of discovering and applying for roles in student clubs, societies, and organizations at VIT. Inspired by my own experience as a freshman, where finding and applying to extracurricular opportunities felt fragmented and inefficient, this platform was built to bridge the gap between students and club coordinators.

The goal of VIT Verse is to foster better engagement in extracurricular activities by replacing unorganized email chains and Google Forms with a modern, scalable, and intuitive platform.

---

## 🚀 Key Features

### For Students
- **Streamlined Applications**: Browse open club positions, filter by skills/interests, and apply directly.
- **Application Tracking**: View status updates such as pending, accepted, or rejected.
- **Personal Profiles**: Manage your personal profile including skills, resume, and bio.

### For Club Coordinators
- **Role Management**: Create and manage open positions with specific requirements.
- **Application Review**: Access and review all submissions from one dashboard.
- **Applicant Tracking**: Accept, reject, or mark applicants with ease.

### System Architecture
- **Role-Based Access Control**: Defined access levels for students and club coordinators.
- **Efficient Data Modeling**: Structured MongoDB schemas to manage users, clubs, applications, and roles using Mongoose.
- **File Upload Handling**: Profile pictures and club logos uploaded via Multer and stored on Cloudinary.

---

## 🛠 Tech Stack

### Frontend
- **React**: Component-based UI development.
- **Redux**: Centralized state management using slices (e.g., `authSlice`, `positionSlice`).
- **React Router**: Dynamic routing with protected access control.
- **Custom Hooks**: Used for API requests and local component state.
- **Framer Motion**: Smooth UI animations.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.

### Backend
- **Node.js & Express.js**: RESTful API development.
- **MongoDB & Mongoose**: NoSQL database with relational modeling via ObjectIds.
- **JWT Authentication**: Secure route protection and session management.
- **Multer & Cloudinary**: Image uploads and cloud storage integration.

---

## 🧩 Project Structure

### 🔷 Frontend
```
src/
├── components/ Common and Specific Components
|   ├── admin/ // Components for admin dashboard
|   ├── auth/ // Login and signup pages
|   ├── shared/ // Navbar, Footer, common UI
|   ├── ui/ // Pages for browsing & viewing positions
├── hooks/ // Custom hooks for API requests
├── redux/ // Redux slices & store
```

### 🔶 Backend
```
backend/
├── controllers/ // application.controller.js, user.controller.js, etc.
├── models/ // Application.js, Club.js, User.js, Position.js
├── routes/ // application.route.js, club.route.js, etc.
├── middlewares/ // isAuthenticated.js, multer.js
├── utils/ // cloudinary.js, datauri.js, db.js
```

---

## 🧪 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/bhavyaLalchandani/VIT_Verse
cd VIT_Verse
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd backend
npm install
npm run dev
```

- Make sure to set up your .env file with:
```bash
MONGO_URI=
JWT_SECRET_KEY=
PORT=
#FOR CLOUDINARY
CLOUD_NAME=
API_KEY=
API_SECRET=
PASSWORD=
```

---
## 👨‍💻 Author
Built with 💙 by Bhavya.
