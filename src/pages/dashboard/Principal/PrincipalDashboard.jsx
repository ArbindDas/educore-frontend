

// this is for teacher
import TeachersTab from "../../../components/principal/teachers/TeachersTab"; // ✅ Import TeachersTab
import { useTeachers } from "../../../hooks/useTeacher";

// this is for Students
import { useEffect, useState } from "react";
import Sidebar from "../../../components/principal/layout/Sidebar";
import Topbar from "../../../components/principal/layout/Topbar";
import MobileSidebar from "../../../components/principal/layout/MobileSidebar";
import ProfileTab from "../../../components/principal/profile/ProfileTab";
import StudentsTab from "../../../components/principal/students/StudentsTab";
import UsersTab from "../../../components/principal/users/UsersTab";
import Toast from "../../../components/principal/common/Toast";
import { useTheme } from "../../../hooks/useTheme";
import { useStudents } from "../../../hooks/useStudents";
import { useUsers } from "../../../hooks/useUsers";
import { getMyPrincipalProfile } from "../../../services/principalService";
import { ImageOff } from "lucide-react";

export default function PrincipalDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  
  const { dark, toggleTheme } = useTheme();
  const { students, studentsLoading, loadStudents } = useStudents();
  const { 
    teachers, 
    teachersLoading, 
    loadTeachers, 
    addTeacher,
    updateTeacher,  // ✅ ADD THIS - was missing
    deleteTeacher   // ✅ ADD THIS - was missing
  } = useTeachers();
  const { users, createUser, filterRole, setFilterRole, search, setSearch } = useUsers();

  // Load profile
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyPrincipalProfile();
        setProfile(data);
      } catch {
        showToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === "students") {
      loadStudents();
    }
    if (activeTab === "teachers") {
      loadTeachers();
    }
  }, [activeTab, loadStudents, loadTeachers]);

  const showToast = (message, type = "success") => setToast({ message, type });

  const handleCreateUser = async (userData) => {
    const success = await createUser(userData);
    if (success) {
      showToast(`${userData.role} "${userData.username}" created successfully`, "success");
      return true;
    } else {
      showToast("Failed to create user", "error");
      return false;
    }
  };

  const handleAddTeacher = async (teacherData) => {
    const success = await addTeacher(teacherData);
    if (success) {
      showToast(`Teacher "${teacherData.username}" added successfully`, "success");
      return true;
    } else {
      showToast("Failed to add teacher", "error");
      return false;
    }
  };

  // ✅ Updated navItems with Teachers tab
  const navItems = [
    { id: "profile", label: "My Profile", icon: "Profile" },
    { id: "teachers", label: "Teachers", icon: "Users", badge: teachers?.length || null },
    { id: "students", label: "Students", icon: "Graduation", badge: students?.length || null },
    { id: "users", label: "Manage Users", icon: "Users", badge: users?.length || null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30">
        <Sidebar 
          profile={profile} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          navItems={navItems}
          dark={dark}
          toggleTheme={toggleTheme}
        />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <MobileSidebar 
          profile={profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navItems={navItems}
          dark={dark}
          toggleTheme={toggleTheme}
          onClose={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="lg:ml-64">
        <Topbar 
          profile={profile}
          activeTab={activeTab}
          dark={dark}
          toggleTheme={toggleTheme}
          students={students}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        <div className="px-4 sm:px-6 py-6 sm:py-8">
          {activeTab === "profile" && (
            <ProfileTab profile={profile} loading={loading} />
          )}

          {activeTab === "teachers" && (
            <TeachersTab 
              teachers={teachers} 
              loading={teachersLoading}
              onCreateTeacher={handleAddTeacher}
              onUpdateTeacher={updateTeacher}  // ✅ ADD THIS - was missing
              onDeleteTeacher={deleteTeacher}  // ✅ ADD THIS - was missing
            />
          )}

          {activeTab === "students" && (
            <StudentsTab 
              students={students} 
              loading={studentsLoading} 
            />
          )}

          {activeTab === "users" && (
            <UsersTab 
              users={users}
              filterRole={filterRole}
              setFilterRole={setFilterRole}
              search={search}
              setSearch={setSearch}
              onCreateUser={handleCreateUser}
            />
          )}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}