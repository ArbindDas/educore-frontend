// // services/authService.js

// import axios from "axios";
// import axiosInstance from "./axiosConfig";
// export const authService = {
//   // Login
//   async login(username, password) {
//     try {
//       // Use regular axios for login (no interceptor needed yet)
//       const response = await axios.post("http://localhost:8000/api/token/", {
//         username,
//         password,
//       });

//       const { access, refresh } = response.data;
//       localStorage.setItem("access_token", access);
//       localStorage.setItem("refresh_token", refresh);

//       // Set default header for future requests
//       axiosInstance.defaults.headers.common["Authorization"] =
//         `Bearer ${access}`;

//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { error: "Login failed" };
//     }
//   },

//   // GET CURRENT USER (VERY IMPORTANT)
//   async getMe() {
//     const response = await axiosInstance.get("me/");
//     return response.data;
//   },

//   // CREATE USER (ONLY PRINCIPAL WILL USE THIS)

//   async createUser(userData) {
//     const response = await axiosInstance.post("create-user/");
//     return response.data;
//   },

//   async logout(){
//     localStorage.clear();
//     delete axiosInstance.defaults.headers.common['Authorization']
//   },

//   isAuthenticated(){
//     return !!localStorage.getItem('access_token')
//   }
// };


import axios from "axios";
import axiosInstance from "./axiosConfig";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

export const authService = {

  async login(username, password) {
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Set header for this session
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Login failed" };
    }
  },

  // Call this once on app startup to restore the header after a page refresh
  init() {
    const token = localStorage.getItem("access_token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },

  async getMe() {
    try {
      const response = await axiosInstance.get("me/");
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch user" };
    }
  },

  async createUser(userData) {
    const response = await axiosInstance.post("create-user/", userData); // ← fixed
    return response.data;
  },

  async logout() {
  localStorage.clear();
  delete axiosInstance.defaults.headers.common["Authorization"];
},

  isAuthenticated() {
    const token = localStorage.getItem("access_token");
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000; // ← checks expiry, not just existence
    } catch {
      return false;
    }
  },
};