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
 export default function App() {
     return (
       <BrowserRouter>
         <Navbar isAuthenticated={false} />
         <Routes>
           <Route path="/login"  element={<Login />}  />
           <Route path="/signup" element={<Signup />} />
           
         </Routes>
       </BrowserRouter>
     );
   }