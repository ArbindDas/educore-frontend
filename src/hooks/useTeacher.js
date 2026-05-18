// import { get } from "react-hook-form";
// import {
//   createTeacher,
//   deleteTeacherById,
//   getAllTeachers,
//   updateTeacherById,
// } from "../services/principalService";

// import { useState, useCallback } from "react";

// export const useTeachers = async () => {
//   const [teachers, setTeachers] = useState([]);
//   const [teacherLoading, setTeacherLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const loadTeachers = useCallback(async () => {
//     setTeacherLoading(true);
//     setError(null);
//     try {
//       const data = await getAllTeachers();
//       setTeachers(data);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setTeacherLoading(false);
//     }
//   }, []);

//   const addTeacher = useCallback(async (teacherData) => {
//     try {
//       const newteacher = await createTeacher();
//       setTeachers((prev) => [...prev, newteacher]);
//       return true;
//     } catch (error) {
//       setError(error);
//       return false;
//     }
//   }, []);

//   const updateTeacherById = useCallback(async (teacherData, teacherId) => {
//     try {
//       const updatedTeacher = await updateTeacherById(teacherData, teacherId);
//       setTeachers((prev) =>
//         prev.map((teacher) =>
//           teacher.id === teacherId ? updatedTeacher : teacher,
//         ),
//       );

//       return true;
//     } catch (error) {
//       setError(error);
//       return false;
//     }
//   }, []);

//   const deleteTeacher = useCallback(async (teacherId) => {
//     try {
//       await deleteTeacherById(teacherId);
//       setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId));
//       return true;
//     } catch (error) {
//       setError(error);
//       return false;
//     }
//   }, []);

//   return {
//     teachers,
//     teacherLoading,
//     error,
//     loadTeachers,
//     updateTeacherById,
//     deleteTeacher,
//   };
// };



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
      const updated = await apiUpdateTeacher(teacherId, teacherData);

      setTeachers((prev) =>
        prev.map((t) => (t.id === teacherId ? updated : t))
      );

      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  }, []);

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