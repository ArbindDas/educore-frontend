import { useState } from "react";



// import TeachersTable from "./TeachersTable";
import TeachersTable from "./TeachersTable";
// import CreateTeacherModal from "./CreateTeacherModal";

import CreateTeacherModal from "./CreateTeacherModal";
import { KPICard } from "../common/KPICard";
import { PrimaryBtn } from "../common/PrimaryBtn";
import { PlusIcon } from "../icons/Icons";
import { ImageOff } from "lucide-react";

export default function TeachersTab({ teachers = [], loading, onCreateTeacher }) {
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const activeTeachers = teachers.filter(t => t.status === "active").length;
  const onLeaveTeachers = teachers.filter(t => t.status === "on_leave").length;
  
  const departments = [...new Set(teachers.map(t => t.department))];

  const filteredTeachers = teachers.filter(t => {
    const matchSearch = t.username.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase());
    const matchDept = departmentFilter === "all" || t.department === departmentFilter;
    return matchSearch && matchDept;
  });

  const kpiData = [
    { label: "Total Teachers", value: teachers.length, gradient: "from-blue-500 to-cyan-500", icon: "👨‍🏫" },
    { label: "Active", value: activeTeachers, gradient: "from-green-500 to-emerald-500", icon: "✅" },
    { label: "On Leave", value: onLeaveTeachers, gradient: "from-yellow-500 to-orange-500", icon: "🌴" },
    { label: "Departments", value: departments.length, gradient: "from-purple-500 to-indigo-500", icon: "🏛️" },
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
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        departments={departments}
        onCreateTeacher={() => setCreateModal(true)}
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