import axios from "axios";
import axiosInstance from "./axiosConfig";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

export const authService = {
  async login(username, password) {
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/token/`,
        {
          username,
          password,
        },
      );

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      console.log(localStorage.getItem("access_token"));

      // Set header for this session
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${access}`;

      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Login failed" };
    }
  },

  // Call this once on app startup to restore the header after a page refresh
  init() {
    const token = localStorage.getItem("access_token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
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
