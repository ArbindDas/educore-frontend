

// // Main teachers tab container
// import { useState } from "react";
// import TeachersTable from "./TeachersTable";
// // import CreateTeacherModal from "./CreateTeacherModal";

// import CreateTeacherModal from "./CreateTeacherModal";
// import { KPICard } from "../common/KPICard";
// import { PrimaryBtn } from "../common/PrimaryBtn";
// import { PlusIcon } from "../icons/Icons";
// import { ImageOff } from "lucide-react";

// export default function TeachersTab({ teachers = [], loading, onCreateTeacher }) {
//   const [createModal, setCreateModal] = useState(false);
//   const [search, setSearch] = useState("");
//   // const [departmentFilter, setDepartmentFilter] = useState("all");

//   const activeTeachers = teachers.filter(t => t.status === "active").length;
//   const onLeaveTeachers = teachers.filter(t => t.status === "on_leave").length;
  
//   // const departments = [...new Set(teachers.map(t => t.department))];

 
//   const filteredTeachers = teachers.filter(t => {
//   const searchValue = search.toLowerCase();

//   return (
//     String(t.id).includes(searchValue) ||
//     (t.username ?? "").toLowerCase().includes(searchValue)
//   );
// });

//   const kpiData = [
//     { label: "Total Teachers", value: teachers.length, gradient: "from-blue-500 to-cyan-500", icon: "👨‍🏫" },
//     { label: "Active", value: activeTeachers, gradient: "from-green-500 to-emerald-500", icon: "✅" },
//     { label: "On Leave", value: onLeaveTeachers, gradient: "from-yellow-500 to-orange-500", icon: "🌴" },
//     // { label: "Departments", value: departments.length, gradient: "from-purple-500 to-indigo-500", icon: "🏛️" },
//   ];

//   return (
//     <div className="flex flex-col gap-6">
//       {/* KPI Row */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {kpiData.map((kpi) => (
//           <KPICard key={kpi.label} {...kpi} />
//         ))}
//       </div>

//       {/* Teachers Table */}
//       <TeachersTable 
//         teachers={teachers}
//         filteredTeachers={filteredTeachers}
//         loading={loading}
//         search={search}
//         setSearch={setSearch}
//         // departmentFilter={departmentFilter}
//         // setDepartmentFilter={setDepartmentFilter}
//         // departments={departments}
//         onCreateTeacher={() => setCreateModal(true)}
//       />

//       {/* Create Teacher Modal */}
//       {createModal && (
//         <CreateTeacherModal 
//           onClose={() => setCreateModal(false)} 
//           onSubmit={onCreateTeacher}
//         />
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import TeachersTable from "./TeachersTable";
import CreateTeacherModal from "./CreateTeacherModal";
import { KPICard } from "../common/KPICard";

export default function TeachersTab({ teachers, loading, onCreateTeacher, onUpdateTeacher, onDeleteTeacher }) {
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = useState("");

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
    // Parse experience years from string (e.g., "5-10 years" -> average)
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

      {/* Teachers Table */}
      <TeachersTable 
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