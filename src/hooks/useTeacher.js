


// Manages teacher data fetching and state


import { useState, useCallback, useEffect } from "react";
import {
  createTeacher,
  deleteTeacherById,
  getAllTeachers,
  updateTeacherById as apiUpdateTeacher,
} from "../services/principalService";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTeachers = useCallback(async () => {
    setTeacherLoading(true);
    setError(null);
    try {
      const data = await getAllTeachers();
      setTeachers(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setTeacherLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);

  const addTeacher = useCallback(async (teacherData) => {
    try {
      const newTeacher = await createTeacher(teacherData);
      setTeachers((prev) => [...prev, newTeacher]);
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  }, []);



  const updateTeacher = useCallback(async (teacherId, teacherData) => {
  try {
    await apiUpdateTeacher(teacherId, teacherData);

    // 🔥 safest way: always re-sync full data from backend
    await loadTeachers();

    return true;
  } catch (err) {
    setError(err);
    return false;
  }
}, [loadTeachers]);

  const deleteTeacher = useCallback(async (teacherId) => {
    try {
      await deleteTeacherById(teacherId);

      setTeachers((prev) =>
        prev.filter((t) => t.id !== teacherId)
      );

      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  }, []);

  return {
    teachers,
    teacherLoading,
    error,
    loadTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
  };
};