



// import axios from "axios";
// import { Rewind } from "lucide-react";
// import { Await } from "react-router-dom";


// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // ✅ FIXED: use correct token key
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("access_token"); // 🔥 FIX HERE

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

// // this is for principal
// export const getMyPrincipalProfile = async () => {
//     const response = await api.get("principal/profile/");
//     return response.data;
// };

// export const createUserByPrincipal = async(data)=> {
//     const response = await api.post("create-user/", data)
//     return response.data;
// }

// // this is for teacher assignement


// export const TeacherAssignment = async(data)=>{
//     const response = await api.post("teacher-assign/",data)
//     return response.data;
// }


// // this is for Students
// export const getAllStudents = async()=>{
//     const response = await api.get("students/")
//     return response.data;
// }



// export const createStudentProfile = async(studentData)=>{
//     const response = await api.post("students/", studentData)
//     return response.data;
// }


// export const updateStudentById = async(studentId, studentData)=>{
//         const response = await api.patch(
//             `students/${studentId}/`, studentData
//         )

//         return response.data;
// }



// export const deleteStudentById = async(studentId)=>{
//     const response = await api.delete(
//         `students/${studentId}/`
//     )
//     return response.data;
// }


// // this is for Teachers
// export const getAllTeachers = async()=>{
//     const response = await api.get("teachers/")
//     return response.data;
// }



// export const createTeacher = async(teacherData)=>{

//     const response = await api.post("teachers/", teacherData)
//     return response.data;
// }


// export const updateTeacherById = async (teacherId, teacherData) => {
//   const response = await api.patch(
//     `teachers/${teacherId}/`,
//     teacherData
//   );
//   return response.data;
// };

// export const deleteTeacherById = async(teacherId)=>{

//     const response = await api.delete(`teachers/${teacherId}/`)
//     return response.data;
// }

// services/principalService.js
import axiosInstance from './axiosConfig'; // ✅ use the single shared instance

// Principal
export const getMyPrincipalProfile = async () => {
    const response = await axiosInstance.get("principal/profile/");
    return response.data;
};

export const createUserByPrincipal = async (data) => {
    const response = await axiosInstance.post("create-user/", data);
    return response.data;
};

// Teacher Assignment
export const TeacherAssignment = async (data) => {
    const response = await axiosInstance.post("teacher-assign/", data);
    return response.data;
};

// Students
export const getAllStudents = async () => {
    const response = await axiosInstance.get("students/");
    return response.data;
};

export const createStudentProfile = async (studentData) => {
    const response = await axiosInstance.post("students/", studentData);
    return response.data;
};

export const updateStudentById = async (studentId, studentData) => {
    const response = await axiosInstance.patch(`students/${studentId}/`, studentData);
    return response.data;
};

export const deleteStudentById = async (studentId) => {
    const response = await axiosInstance.delete(`students/${studentId}/`);
    return response.data;
};

// Teachers
export const getAllTeachers = async () => {
    const response = await axiosInstance.get("teachers/");
    return response.data;
};

export const createTeacher = async (teacherData) => {
    const response = await axiosInstance.post("teachers/", teacherData);
    return response.data;
};

export const updateTeacherById = async (teacherId, teacherData) => {
    const response = await axiosInstance.patch(`teachers/${teacherId}/`, teacherData);
    return response.data;
};

export const deleteTeacherById = async (teacherId) => {
    const response = await axiosInstance.delete(`teachers/${teacherId}/`);
    return response.data;
};