import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const markAttendance = async (attendanceData) => {
    const response = await api.post("/attendance/mark/", attendanceData);
    return response.data;
};

export const checkAttendanceSummary = async (date) => {
    const response = await api.get(`/attendance/summary/?date=${date}`);
    return response.data;  // ← this was missing
};

export const specificStudentAttendance = async (studentId) => {
    const response = await api.get(`/attendance/student/${studentId}/`);
    return response.data;
};

export const getMyAttendanceRecord =  async() => {
    const response =  await api.get("/attendance/my-attendance/")
    return response.data;
}