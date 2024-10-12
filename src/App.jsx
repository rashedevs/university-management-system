import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentDashboard from "./components/StudentDashboard";
import FacultyManagement from "./components/FacultyManagement";
import CourseRegistration from "./components/CourseRegistration";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Student Dashboard</Link>
          </li>
          <li>
            <Link to="/faculty">Faculty Management</Link>
          </li>
          <li>
            <Link to="/register">Course Registration</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyManagement />} />
        <Route path="/register" element={<CourseRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
