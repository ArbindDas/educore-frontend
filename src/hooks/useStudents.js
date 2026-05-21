import { useState, useCallback } from "react";
import {
  createStudentProfile as apiCreateStudentProfile,
  deleteStudentById,
  getAllStudents,
  updateStudentById as apiUpdateStudent,
} from "../services/principalService";

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadStudents = useCallback(async () => {
    setStudentsLoading(true);
    setError(null);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err);
    } finally {
      setStudentsLoading(false);
    }
  }, []); // Empty dependency array because it doesn't depend on any props/state

  // return { students, studentsLoading, error, loadStudents };

  const createStudentProfile = useCallback(async (studentData) => {
      console.log("createStudentProfile called with:", studentData); // ← ADD THIS
    try {
      const newStudent = await apiCreateStudentProfile(studentData);
      console.log("API response:", newStudent); // ← ADD THIS
      setStudents((prev) => [...prev, newStudent]);
      // 👉 “It adds the new student to the existing students list and updates the state immutably.”
      // Slightly more detailed explanation
      // prev is the current state (old students array)
      // ...prev copies all existing students
      // newStudent is added at the end
      // setStudents replaces the old state with this new array
      return true;
    } catch (error) {
      console.error("Create error details:", error); // ← ADD THIS
      setError(error);
      return false;
    }
  }, []);

  const updateStudent = useCallback(async (studentId, studentData) => {
    try {
      const updatedStudent = await apiUpdateStudent(studentId, studentData);
      console.log("API response : ", updatedStudent);

      // create a completely new array  with updated data

      // 👉 “It loops through all students, finds the one with matching ID, updates its fields, and returns a new updated array.”
      setStudents((prev) => {
        const updatedStudents = prev.map((student) =>
          student.id === studentId
            ? {
                ...student,
                ...studentData,
                _updated: Date.now(),
              }
            : student,
        );

        return updatedStudents;
      });
      return true;
    } catch (error) {
      setError(error);
      console.log("Update error : ", error);
      return false;
    }
  });

  // delete student with immediate state update
  const deleteStudent = useCallback(async (studentId) => {
    try {
      await deleteStudentById(studentId);
      // update local state immediately without reloading

      setStudents((prev) => prev.filter((student) => student.id !== studentId));
      return true;
    } catch (error) {
      setError(error);
      return false;
    }
  }, []);

  return {
    students,
    studentsLoading,
    error,
    loadStudents,
    createStudentProfile,
    updateStudent,
    deleteStudent,
  };
};
