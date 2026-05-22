// {
//     "username": "motilal",
//     "email": "motilal@gmail.com",
//     "phone_number": "9819294515",
//     "experience": "4 years",
//     "qualification": "CSE"
// }

import axios from "axios";
import { useState } from "react";



const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ FIXED: use correct token key
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // 🔥 FIX HERE

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getMyTeacherProfile = async () => {
  const response = await api.get("teacher/me/");
  return response.data;
};
