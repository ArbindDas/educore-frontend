
import { useEffect, useState } from "react";
import { getMyStudentProfile } from "../../../services/studentService";
import { getMyAttendanceRecord } from "../../../services/attendanceService";

const ProfileField = ({ label, value, icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
      <span className="text-sm leading-none">{icon}</span>
      {label}
    </label>
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 min-h-[40px] flex items-center transition-colors duration-200 hover:border-indigo-300 dark:hover:border-indigo-700">
      {value || <span className="text-gray-400 dark:text-gray-600 italic font-normal">—</span>}
    </div>
  </div>
);

const SkeletonField = () => (
  <div className="flex flex-col gap-1.5">
    <div className="h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    <div className="h-10 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
  </div>
);

// Attendance Record Component
const AttendanceRecord = ({ record }) => {
  const statusColors = {
    Present: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    Absent: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
    Late: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {new Date(record.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[record.status_display]}`}>
            {record.status_display}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span>👨‍🏫</span>
            Marked by: {record.marked_by}
          </span>
          <span className="flex items-center gap-1">
            <span>🕒</span>
            {new Date(record.marked_at).toLocaleTimeString()}
          </span>
        </div>
      </div>
      <div className="text-2xl self-end sm:self-center">
        {record.status === "P" && "✓"}
        {record.status === "A" && "✗"}
        {record.status === "L" && "~"}
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, color }) => {
  const colors = {
    present: "from-green-500 to-emerald-500",
    absent: "from-red-500 to-rose-500",
    late: "from-yellow-500 to-amber-500",
    percentage: "from-indigo-500 to-purple-500"
  };

  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className={`text-2xl font-bold bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
        {value}
      </div>
    </div>
  );
};

// Mobile Sidebar Component
const MobileSidebar = ({ activeTab, setActiveTab, attendance, dark, setDark, initials, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                EC
              </div>
              <span className="font-bold text-sm text-gray-900 dark:text-white tracking-tight">EduCore</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => {
                setActiveTab("profile");
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "profile"
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              My Profile
            </button>

            <button
              onClick={() => {
                setActiveTab("attendance");
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "attendance"
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Attendance
              {attendance && (
                <span className="ml-auto text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                  {attendance.attendance_percentage}%
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Theme Toggle in Sidebar */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => setDark((d) => !d)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
          >
            {dark ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m14.95 5.66-.7-.7M6.41 6.41l-.7-.7m12.02 0-.7.7M6.41 17.59l-.7.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                </svg>
                Dark Mode
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("educore-theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
    localStorage.setItem("educore-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyStudentProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const loadAttendance = async () => {
    setAttendanceLoading(true);
    try {
      const data = await getMyAttendanceRecord();
      setAttendance(data);
    } catch (error) {
      console.error("Failed to load attendance:", error);
    } finally {
      setAttendanceLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "attendance" && !attendance) {
      loadAttendance();
    }
  }, [activeTab]);

  const initials = profile?.username
    ? profile.username.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden lg:block fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30">
        <div className="p-6">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              EC
            </div>
            <span className="font-bold text-sm text-gray-900 dark:text-white tracking-tight">EduCore</span>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "profile"
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              My Profile
            </button>

            <button
              onClick={() => setActiveTab("attendance")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "attendance"
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Attendance
              {attendance && (
                <span className="ml-auto text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                  {attendance.attendance_percentage}%
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Theme Toggle in Sidebar */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => setDark((d) => !d)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
          >
            {dark ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m14.95 5.66-.7-.7M6.41 6.41l-.7-.7m12.02 0-.7.7M6.41 17.59l-.7.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                </svg>
                Dark Mode
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        attendance={attendance}
        dark={dark}
        setDark={setDark}
        initials={initials}
        isOpen={mobileSidebarOpen}
        setIsOpen={setMobileSidebarOpen}
      />

      {/* ── MAIN CONTENT ── */}
      <main className="lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 transition-colors duration-300 shadow-sm">
          {/* Left section with hamburger menu */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {activeTab === "profile" ? "Student Profile" : "Attendance Records"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate hidden sm:block">
                {activeTab === "profile" 
                  ? "View and manage your personal information" 
                  : `Track your attendance for ${new Date().getFullYear()}`}
              </p>
            </div>
          </div>

          {/* Right section with theme toggle and profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              className="hidden lg:flex p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 transition-all"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m14.95 5.66-.7-.7M6.41 6.41l-.7-.7m12.02 0-.7.7M6.41 17.59l-.7.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                </svg>
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {initials}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                {profile?.username}
              </span>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 py-4 sm:py-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="flex flex-col gap-6">
              {/* Profile Card */}
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-colors duration-300">
                <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
                
                <div className="p-4 sm:p-6 flex flex-col gap-6">
                  {/* Avatar + Name Hero */}
                  {loading ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />
                      <div className="flex flex-col gap-2 flex-1 text-center sm:text-left">
                        <div className="h-4 w-36 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto sm:mx-0" />
                        <div className="h-3 w-48 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse mx-auto sm:mx-0" />
                        <div className="h-5 w-24 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse mt-1 mx-auto sm:mx-0" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0 ring-2 ring-indigo-100 dark:ring-indigo-900 shadow-sm">
                        {initials}
                      </div>
                      <div className="flex flex-col min-w-0 text-center sm:text-left">
                        <span className="text-base font-bold text-gray-900 dark:text-white truncate">{profile?.username}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5 truncate">{profile?.email}</span>
                        <span className="mt-1.5 inline-flex items-center gap-1.5 self-center sm:self-start bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Active Student
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-100 dark:border-gray-800" />

                  {/* Admission Strip */}
                  {loading ? (
                    <div className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                  ) : (
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-4 sm:px-5 py-3 sm:py-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Admission Number</p>
                        <p className="text-sm sm:text-base font-bold text-white font-mono tracking-wide mt-0.5 truncate">{profile?.admission_number}</p>
                      </div>
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-25 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                      </svg>
                    </div>
                  )}

                  {/* Academic Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                        Academic Info
                      </span>
                      <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                    </div>
                    {loading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => <SkeletonField key={i} />)}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ProfileField label="Academic Class" value={profile?.academic_class} icon="🎓" />
                        <ProfileField label="Section" value={profile?.section} icon="🏷️" />
                        <ProfileField label="Roll Number" value={profile?.roll_number} icon="🔢" />
                        <ProfileField label="Address" value={profile?.address} icon="📍" />
                      </div>
                    )}
                  </div>

                  {/* Account Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                        Account Info
                      </span>
                      <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                    </div>
                    {loading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(2)].map((_, i) => <SkeletonField key={i} />)}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ProfileField label="Full Name" value={profile?.username} icon="👤" />
                        <ProfileField label="Email" value={profile?.email} icon="✉️" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === "attendance" && (
            <div className="flex flex-col gap-6">
              {attendanceLoading ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                    ))}
                  </div>
                  <div className="h-48 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                  <div className="h-64 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                </div>
              ) : attendance ? (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <StatsCard 
                      title="Total Present" 
                      value={attendance.total_present} 
                      icon="✓" 
                      color="present"
                    />
                    <StatsCard 
                      title="Total Absent" 
                      value={attendance.total_absent} 
                      icon="✗" 
                      color="absent"
                    />
                    <StatsCard 
                      title="Total Late" 
                      value={attendance.total_late} 
                      icon="~" 
                      color="late"
                    />
                    <StatsCard 
                      title="Attendance %" 
                      value={`${attendance.attendance_percentage}%`} 
                      icon="📊" 
                      color="percentage"
                    />
                  </div>

                  {/* Summary Card */}
                  <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Attendance Summary</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Total Records: {attendance.total_records}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                            {attendance.attendance_percentage}%
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Overall Attendance</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>Present</span>
                          <span>{attendance.total_present} / {attendance.total_records}</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${attendance.attendance_percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Records */}
                  <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detailed Records</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        All your attendance records ordered by date
                      </p>
                    </div>
                    <div className="p-4 sm:p-6">
                      {attendance.attendance_records.length > 0 ? (
                        <div className="space-y-3">
                          {attendance.attendance_records.map((record, index) => (
                            <AttendanceRecord key={index} record={record} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 sm:py-12">
                          <div className="text-6xl mb-4">📭</div>
                          <p className="text-gray-500 dark:text-gray-400">No attendance records found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 sm:p-12 text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <p className="text-gray-500 dark:text-gray-400">Failed to load attendance data</p>
                  <button
                    onClick={loadAttendance}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}