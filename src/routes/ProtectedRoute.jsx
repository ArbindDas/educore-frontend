// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const token = localStorage.getItem("access_token");
//   const user = JSON.parse(localStorage.getItem("user")); // we will store this

//   // 1. Not logged in
//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   // 2. Role not allowed
//   if (!allowedRoles.includes(user?.role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   // 3. Allowed
//   return children;
// }


import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // npm install jwt-decode

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 1. Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 2. Token expired
  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.clear();
      return <Navigate to="/login" />;
    }
  } catch {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  // 3. Role not allowed
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // 4. Allowed
  return children;
}