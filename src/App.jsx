import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import Home from "../src/pages/Home";
import Navbar from "../src/components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import PrincipalDashboard from "../src/pages/dashboard/Principal/PrincipalDashboard";
import StudentDashboard from "../src/pages/dashboard/Student/StudentDashboard";
import TeacherDashboard from "../src/pages/dashboard/Teacher/TeacherDashboard";
import LibrarianDashboard from "../src/pages/dashboard/Librarian/LibrarianDashboard";
export default function App() {
  return (
    <BrowserRouter>
    <Navbar isAuthenticated={false} />
      {/* <Navbar /> */}

      <Routes>
        <Route />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/principal"
          element={
            <ProtectedRoute allowedRoles={["principal"]}>
              <PrincipalDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/librarian"
          element={
            <ProtectedRoute allowedRoles={['librarian']}>
                <LibrarianDashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
