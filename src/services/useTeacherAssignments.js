// services/useTeacherAssignments.js
import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useTeacherAssignments = () => {
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [teacherAssignmentsLoading, setTeacherAssignmentsLoading] =
    useState(false);

  // GET all assignments
  const loadTeacherAssignments = useCallback(async () => {
    setTeacherAssignmentsLoading(true);
    try {
      const response = await api.get("/teacher-assign/");
      setTeacherAssignments(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to load assignments:", error);
      return [];
    } finally {
      setTeacherAssignmentsLoading(false);
    }
  }, []);

  // services/useTeacherAssignments.js
  const createTeacherAssignment = useCallback(
    async (assignmentData) => {
      console.log("Creating assignment with data:", assignmentData); // Add this log

      try {
        const response = await api.post("/teacher-assign/", assignmentData);
        console.log("Response:", response.data); // Add this log
        await loadTeacherAssignments();
        return true;
      } catch (error) {
        console.error("Failed to create assignment:", error);
        console.error("Error response data:", error.response?.data); // Add this log
        console.error("Error response status:", error.response?.status); // Add this log

        if (error.response?.status === 403) {
          alert("Only principal can assign teachers");
        } else if (error.response?.data) {
          // Show specific error message from backend
          const errorMsg = JSON.stringify(error.response.data);
          alert(`Failed to assign teacher: ${errorMsg}`);
        }
        return false;
      }
    },
    [loadTeacherAssignments],
  );

  // Filter functions
  const getAssignmentsByTeacher = useCallback(
    (teacherId) => {
      return teacherAssignments.filter(
        (assignment) => assignment.teacher_id === teacherId,
      );
    },
    [teacherAssignments],
  );

  const getAssignmentsByClass = useCallback(
    (classId) => {
      return teacherAssignments.filter(
        (assignment) => assignment.academic_class_id === classId,
      );
    },
    [teacherAssignments],
  );

  return {
    teacherAssignments,
    teacherAssignmentsLoading,
    loadTeacherAssignments,
    createTeacherAssignment,
    getAssignmentsByTeacher,
    getAssignmentsByClass,
  };
};
