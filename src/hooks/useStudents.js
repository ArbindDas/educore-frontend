import { useState , useCallback} from "react";
import { getAllStudents } from "../services/principalService";

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

  return { students, studentsLoading, error, loadStudents };
};