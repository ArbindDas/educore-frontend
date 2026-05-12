import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrincipalDashboard from "./pages/dashboard/Principal/PrincipalDashboard"
import TeacherDashboard from "./pages/dashboard/Teacher/TeacherDashboard"
import StudentDashboard from "./pages/dashboard/Student/StudentDashboard"
import LibraryDashboard from "./pages/dashboard/Librarian/LibrarianDashboard"
import ProtectedRoute from "./routes/ProtectedRoute"
import Unauthorized from "./pages/errors/Unauthorized";
import NotFound from "./pages/errors/NotFound";
 export default function App() {
     return (
       <BrowserRouter>
         <Navbar isAuthenticated={false} />
         <Routes>

            <Route path="/unauthorized" element={<Unauthorized />} />
           <Route path="/" element={<Home/>} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login"  element={<Login />}  />
          
           {/* Dashboards */}


           <Route
            path="/principal"
            element={
              <ProtectedRoute allowedRoles={["principal"]}>
                <PrincipalDashboard/>
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
           path="/student"
           element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard/>
            </ProtectedRoute>
           }
           />


           <Route

            path="/librarian"
            element={
              <ProtectedRoute allowedRoles={['librarian']}>
                  <LibraryDashboard/>
              </ProtectedRoute>
            }
           />

            <Route path="*" element={<NotFound />} /> 
         </Routes>
       </BrowserRouter>
     );
   }