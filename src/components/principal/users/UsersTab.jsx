import { useState } from "react";
import UsersTable from "./UsersTable";
import CreateUserModal from "./CreateUserModal";
import { PrimaryBtn } from "../common/PrimaryBtn";
import{ROLE_OPTIONS , ROLE_COLORS} from "../../../constant/principalConstants"
import { ImageOff } from "lucide-react";
import { KPICard } from "../common/KPICard";

export default function UsersTab({ users, filterRole, setFilterRole, search, setSearch, onCreateUser }) {
  const [createModal, setCreateModal] = useState(false);

  const countByRole = (role) => users.filter((u) => u.role === role).length;

  const kpiData = [
    { label: "Total Created", value: users.length, gradient: "from-indigo-600 to-blue-500", icon: "👥" },
    { label: "Teachers", value: countByRole("teacher"), gradient: "from-blue-500 to-cyan-500", icon: "👨‍🏫" },
    { label: "Students", value: countByRole("student"), gradient: "from-green-500 to-emerald-500", icon: "🎓" },
    { label: "Librarians", value: countByRole("librarian"), gradient: "from-purple-500 to-indigo-500", icon: "📚" },
  ];

  const filteredUsers = users.filter((u) => {
    const matchRole = filterRole === "all" || u.role === filterRole;
    const matchSearch = u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* User Table Card */}
      <UsersTable 
        users={users}
        filteredUsers={filteredUsers}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        search={search}
        setSearch={setSearch}
        onCreateUser={() => setCreateModal(true)}
      />

      {/* Role info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ROLE_OPTIONS.map(({ value, label }) => (
          <div
            key={value}
            className="rounded-xl p-4 border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer"
            onClick={() => setCreateModal(true)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ROLE_COLORS[value]} flex items-center justify-center text-xl shadow-sm`}
              >
                {value === "teacher" ? "👨‍🏫" : value === "student" ? "🎓" : "📚"}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">
                  {value}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Click to create {value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create User Modal */}
      {createModal && (
        <CreateUserModal 
          onClose={() => setCreateModal(false)} 
          onSubmit={onCreateUser}
        />
      )}
    </div>
  );
}