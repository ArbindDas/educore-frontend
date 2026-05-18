
import StudentTable from "./StudentTable";
import { KPICard } from "../common/KPICard";
import { useState } from "react";

export default function StudentsTab({ students, loading }) {
  const [studentSearch, setStudentSearch] = useState("");

  const filteredStudents = students?.filter(
    (s) =>
      s.username.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.class_name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.admission_number.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.address.toLowerCase().includes(studentSearch.toLowerCase())
  ) || [];

  const uniqueClasses = [...new Set(students?.map((s) => s.class_name) || [])];
  const avgRollNumber = students?.length > 0
    ? Math.round(students.reduce((a, s) => a + s.roll_number, 0) / students.length)
    : 0;

  const kpiData = [
    { label: "Total Students", value: students?.length || 0, gradient: "from-green-500 to-emerald-500", icon: "🎓" },
    { label: "Classes", value: uniqueClasses.length, gradient: "from-indigo-600 to-blue-500", icon: "🏫" },
    { label: "Searching", value: studentSearch ? filteredStudents.length : students?.length || 0, gradient: "from-blue-500 to-cyan-500", icon: "🔍" },
    { label: "Avg Roll No.", value: avgRollNumber, gradient: "from-purple-500 to-indigo-500", icon: "📋" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Students Table Card */}
      <StudentTable 
        students={students || []} 
        loading={loading} 
        search={studentSearch}
        setSearch={setStudentSearch}
        filteredStudents={filteredStudents}
      />
    </div>
  );
}