// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentDashboard from "./components/StudentDashboard";
import FacultyManagement from "./components/FacultyManagement";
import CourseRegistration from "./components/CourseRegistration";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyManagement />} />
        <Route path="/register" element={<CourseRegistration />} />
      </Routes>
      {/* ToastContainer at the root level */}
      <ToastContainer />
    </Router>
  );
}

export default App;
