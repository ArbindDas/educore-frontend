
// TeachersTab.jsx
import { useState, useEffect } from "react";
import TeachersTable from "./TeachersTable";
import CreateTeacherModal from "./CreateTeacherModal";
import { KPICard } from "../common/KPICard";

export default function TeachersTab({ teachers, loading, onCreateTeacher, onUpdateTeacher, onDeleteTeacher }) {
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Add this to debug when teachers update
  useEffect(() => {
    console.log("TeachersTab received updated teachers:", teachers.length, teachers);
  }, [teachers]);

  const filteredTeachers = teachers.filter(t => {
    const username = t.username || t.user?.username || '';
    const qualification = t.qualification || '';
    const phone = t.phone_number || '';
    
    return username.toLowerCase().includes(search.toLowerCase()) ||
      qualification.toLowerCase().includes(search.toLowerCase()) ||
      phone.includes(search);
  });

  // Calculate statistics
  const totalTeachers = teachers.length;
  const avgExperience = teachers.reduce((acc, t) => {
    const expMatch = t.experience?.match(/\d+/g);
    if (expMatch) {
      const years = expMatch.length === 1 ? parseInt(expMatch[0]) : 
                    (parseInt(expMatch[0]) + parseInt(expMatch[1])) / 2;
      return acc + years;
    }
    return acc;
  }, 0) / (totalTeachers || 1);

  const kpiData = [
    { label: "Total Teachers", value: totalTeachers, gradient: "from-blue-500 to-cyan-500", icon: "👨‍🏫" },
    { label: "Avg Experience", value: `${Math.round(avgExperience)} yrs`, gradient: "from-green-500 to-emerald-500", icon: "📊" },
    { label: "Qualified", value: teachers.filter(t => t.qualification).length, gradient: "from-purple-500 to-indigo-500", icon: "🎓" },
    { label: "Has Contact", value: teachers.filter(t => t.phone_number).length, gradient: "from-orange-500 to-red-500", icon: "📱" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Teachers Table - Add a key prop to force re-render */}
      <TeachersTable 
        key={teachers.length} // ✅ This forces re-render when teacher count changes
        teachers={teachers}
        filteredTeachers={filteredTeachers}
        loading={loading}
        search={search}
        setSearch={setSearch}
        onCreateTeacher={() => setCreateModal(true)}
        onUpdateTeacher={onUpdateTeacher}
        onDeleteTeacher={onDeleteTeacher}
      />

      {/* Create Teacher Modal */}
      {createModal && (
        <CreateTeacherModal 
          onClose={() => setCreateModal(false)} 
          onSubmit={onCreateTeacher}
        />
      )}
    </div>
  );
}