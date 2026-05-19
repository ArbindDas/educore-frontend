


// // Manages teacher data fetching and state


// import { useState, useCallback, useEffect } from "react";
// import {
//   createTeacher,
//   deleteTeacherById,
//   getAllTeachers,
//   updateTeacherById as apiUpdateTeacher,
// } from "../services/principalService";

// export const useTeachers = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [teacherLoading, setTeacherLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const loadTeachers = useCallback(async () => {
//     setTeacherLoading(true);
//     setError(null);
//     try {
//       const data = await getAllTeachers();
//       setTeachers(data || []);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setTeacherLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadTeachers();
//   }, [loadTeachers]);

//   const addTeacher = useCallback(async (teacherData) => {
//     try {
//       const newTeacher = await createTeacher(teacherData);
//       setTeachers((prev) => [...prev, newTeacher]);
//       return true;
//     } catch (err) {
//       setError(err);
//       return false;
//     }
//   }, []);



// //   const updateTeacher = useCallback(async (teacherId, teacherData) => {
// //   try {
// //     await apiUpdateTeacher(teacherId, teacherData);

// //     // 🔥 safest way: always re-sync full data from backend
// //     await loadTeachers();

// //     return true;
// //   } catch (err) {
// //     setError(err);
// //     return false;
// //   }
// // }, [loadTeachers]);

// const updateTeacher = useCallback(async (teacherId, teacherData) => {
//   try {
//     await apiUpdateTeacher(teacherId, teacherData);
//     await loadTeachers();
//     return true;  // ✅ Returns true on success
//   } catch (err) {
//     setError(err);
//     return false; // ✅ Returns false on error
//   }
// }, [loadTeachers]);



//   const deleteTeacher = useCallback(async (teacherId) => {
//     try {
//       await deleteTeacherById(teacherId);

//       setTeachers((prev) =>
//         prev.filter((t) => t.id !== teacherId)
//       );

//       return true;
//     } catch (err) {
//       setError(err);
//       return false;
//     }
//   }, []);

//   return {
//     teachers,
//     teacherLoading,
//     error,
//     loadTeachers,
//     addTeacher,
//     updateTeacher,
//     deleteTeacher,
//   };
// };


// useTeacher.js - Fixed version with proper state updates
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

  // // ✅ FIXED: Update teacher with immediate state update
  // const updateTeacher = useCallback(async (teacherId, teacherData) => {
  //   try {
  //     // Call the API to update
  //     const updatedTeacher = await apiUpdateTeacher(teacherId, teacherData);
      
  //     // Update local state immediately WITHOUT reloading
  //     setTeachers((prev) =>
  //       prev.map((teacher) =>
  //         teacher.id === teacherId 
  //           ? { ...teacher, ...teacherData, ...updatedTeacher }
  //           : teacher
  //       )
  //     );
      
  //     return true;
  //   } catch (err) {
  //     setError(err);
  //     return false;
  //   }
  // }, []);


//   const updateTeacher = useCallback(async (teacherId, teacherData) => {
//   console.log("Updating teacher:", teacherId, teacherData);
  
//   try {
//     const updatedTeacher = await apiUpdateTeacher(teacherId, teacherData);
//     console.log("API response:", updatedTeacher);
    
//     setTeachers((prev) => {
//       const newTeachers = prev.map((teacher) =>
//         teacher.id === teacherId 
//           ? { ...teacher, ...teacherData, ...updatedTeacher }
//           : teacher
//       );
//       console.log("New teachers state:", newTeachers);
//       return newTeachers;
//     });
    
//     return true;
//   } catch (err) {
//     console.error("Update error:", err);
//     setError(err);
//     return false;
//   }
// }, []);


  // useTeacher.js - Alternative approach
const updateTeacher = useCallback(async (teacherId, teacherData) => {
  console.log("Updating teacher:", teacherId, teacherData);
  
  try {
    const updatedTeacher = await apiUpdateTeacher(teacherId, teacherData);
    console.log("API response:", updatedTeacher);
    
    // ✅ Create a completely new array with updated data
    setTeachers(prev => {
      const updatedTeachers = prev.map(teacher => 
        teacher.id === teacherId 
          ? { ...teacher, ...teacherData, ...updatedTeacher, _updated: Date.now() } // Add timestamp
          : teacher
      );
      return [...updatedTeachers]; // Return a new array reference
    });
    
    return true;
  } catch (err) {
    console.error("Update error:", err);
    setError(err);
    return false;
  }
}, []);

  // ✅ FIXED: Delete teacher with immediate state update
  const deleteTeacher = useCallback(async (teacherId) => {
    try {
      await deleteTeacherById(teacherId);
      
      // Update local state immediately WITHOUT reloading
      setTeachers((prev) =>
        prev.filter((teacher) => teacher.id !== teacherId)
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