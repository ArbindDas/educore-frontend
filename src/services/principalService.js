


// {
//     "username": "motilal",
//     "email": "motilal@gmail.com",
//     "phone_number": "9819294515",
//     "experience": "4 years",
//     "qualification": "CSE"
// }



import axios from "axios";
import { Await } from "react-router-dom";

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

// this is for principal
export const getMyPrincipalProfile = async () => {
    const response = await api.get("principal/profile/");
    return response.data;
};

export const createUserByPrincipal = async(data)=> {
    const response = await api.post("create-user/", data)
    return response.data;
}


// this is for Students
export const getAllStudents = async()=>{
    const response = await api.get("students/")
    return response.data;
}



export const createStudentProfile = async(studentData)=>{
    const response = await api.post("students/", studentData)
    return response.data;
}


export const updateStudentById = async(studentId, studentData)=>{
        const response = await api.patch(
            `students/${studentId}/`, studentData
        )

        return response.data;
}



export const deleteStudentById = async(studentId)=>{
    const response = await api.delete(
        `students/${studentId}/`
    )
    return response.data;
}


// this is for Teachers
export const getAllTeachers = async()=>{
    const response = await api.get("teachers/")
    return response.data;
}



export const createTeacher = async(teacherData)=>{

    const response = await api.post("teachers/", teacherData)
    return response.data;
}


export const updateTeacherById = async (teacherId, teacherData) => {
  const response = await api.patch(
    `teachers/${teacherId}/`,
    teacherData
  );
  return response.data;
};

export const deleteTeacherById = async(teacherId)=>{

    const response = await api.delete(`teachers/${teacherId}/`)
    return response.data;
}