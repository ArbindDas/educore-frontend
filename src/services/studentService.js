import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

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

export const getMyStudentProfile = async () => {
    const response = await api.get("/student/me/");
    return response.data;
};

