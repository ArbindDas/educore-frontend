
import { useEffect, useState } from "react";
import {
  getMyPrincipalProfile,
  createUserByPrincipal,
  getAllStudents,
} from "../../../services/principalService";

// ─── Reusable UI Primitives ───────────────────────────────────────────────────

const ProfileField = ({ label, value, icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
      <span className="text-sm leading-none">{icon}</span>
      {label}
    </label>
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 min-h-[40px] flex items-center transition-colors duration-200 hover:border-indigo-300 dark:hover:border-indigo-700">
      {value || (
        <span className="text-gray-400 dark:text-gray-600 italic font-normal">
          —
        </span>
      )}
    </div>
  </div>
);

const SkeletonField = () => (
  <div className="flex flex-col gap-1.5">
    <div className="h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    <div className="h-10 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
  </div>
);

const SkeletonRow = () => (
  <tr className="border-b border-gray-50 dark:border-gray-800/50">
    {Array(5)
      .fill()
      .map((_, i) => (
        <td key={i} className="px-4 sm:px-6 py-3.5">
          <div className="h-5 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
        </td>
      ))}
  </tr>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  options,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {options ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
      >
        <option value="">Select role…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
      />
    )}
  </div>
);

const PrimaryBtn = ({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 hover:shadow-indigo-200 dark:hover:shadow-indigo-900/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const SecondaryBtn = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold bg-white dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

const Badge = ({ role }) => {
  const map = {
    teacher:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    student:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    librarian:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    principal:
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${map[role] || map.teacher}`}
    >
      {role}
    </span>
  );
};

const ClassBadge = ({ name }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
    {name}
  </span>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />
    <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  </div>
);

const Toast = ({ message, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, []);
  const colors = {
    success:
      "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300",
    error:
      "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300",
  };
  return (
    <div
      className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium transition-all ${colors[type]}`}
    >
      <span>{type === "success" ? "✓" : "✗"}</span>
      {message}
    </div>
  );
};

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLE_OPTIONS = [
  { value: "teacher", label: "👨‍🏫 Teacher" },
  { value: "student", label: "🎓 Student" },
  { value: "librarian", label: "📚 Librarian" },
];

const EMPTY_USER_FORM = { username: "", email: "", password: "", role: "" };

const ROLE_COLORS = {
  teacher: "from-blue-500 to-cyan-500",
  student: "from-green-500 to-emerald-500",
  librarian: "from-purple-500 to-indigo-500",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PrincipalDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dark, setDark] = useState(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem("educore-theme") === "dark",
  );

  // ── User management state
  const [users, setUsers] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [userForm, setUserForm] = useState(EMPTY_USER_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [search, setSearch] = useState("");

  // ── Students state
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");

  // ── Theme
  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
    localStorage.setItem("educore-theme", dark ? "dark" : "light");
  }, [dark]);

  // ── Load profile
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

  // ── Load students when tab is active
  useEffect(() => {
    if (activeTab !== "students") return;
    const load = async () => {
      setStudentsLoading(true);
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch {
        showToast("Failed to load students", "error");
      } finally {
        setStudentsLoading(false);
      }
    };
    load();
  }, [activeTab]);

  const showToast = (message, type = "success") => setToast({ message, type });

  const initials = profile?.username
    ? profile.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "PR";

  // ── Create user handler
  const handleUserFormChange = (e) =>
    setUserForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createUserByPrincipal({
        username: userForm.username,
        email: userForm.email,
        password: userForm.password,
        role: userForm.role,
      });
      setUsers((prev) => [
        ...prev,
        { ...userForm, id: Date.now(), created_at: new Date().toISOString() },
      ]);
      showToast(
        `${userForm.role} "${userForm.username}" created successfully`,
        "success",
      );
      setCreateModal(false);
      setUserForm(EMPTY_USER_FORM);
    } catch (err) {
      const msg =
        err?.response?.data?.username?.[0] ||
        err?.response?.data?.email?.[0] ||
        err?.response?.data?.error ||
        "Failed to create user";
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Filter users
  const filteredUsers = users.filter((u) => {
    const matchRole = filterRole === "all" || u.role === filterRole;
    const matchSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  // ── Filter students
  const filteredStudents = students.filter(
    (s) =>
      s.username.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.class_name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.admission_number.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.address.toLowerCase().includes(studentSearch.toLowerCase()),
  );

  const countByRole = (role) => users.filter((u) => u.role === role).length;

  // ── Nav items
  const navItems = [
    { id: "profile", label: "My Profile", Icon: ProfileIcon },
    {
      id: "students",
      label: "All Students",
      Icon: GraduationIcon,
      badge: students.length || null,
    },
    {
      id: "users",
      label: "Manage Users",
      Icon: UsersIcon,
      badge: users.length || null,
    },
  ];

  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            EC
          </div>
          <div>
            <span className="font-bold text-sm text-gray-900 dark:text-white tracking-tight block">
              EduCore
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              Principal Portal
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Principal pill */}
      <div className="mx-4 mb-5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {profile?.username || "Principal"}
            </p>
            <p className="text-[10px] text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Active Principal
            </p>
          </div>
        </div>
      </div>

      <p className="px-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-2">
        Navigation
      </p>

      {/* Nav */}
      <nav className="px-3 space-y-1 flex-1">
        {navItems.map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === id
                ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-left">{label}</span>
            {badge ? (
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-semibold">
                {badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      {/* Theme toggle */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setDark((d) => !d)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
        >
          {dark ? (
            <>
              <SunIcon className="w-3.5 h-3.5" /> Light Mode
            </>
          ) : (
            <>
              <MoonIcon className="w-3.5 h-3.5" /> Dark Mode
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-2xl">
            <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-all"
            >
              <HamburgerIcon className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                {activeTab === "profile"
                  ? "Principal Dashboard"
                  : activeTab === "students"
                    ? "All Students"
                    : "User Management"}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                {activeTab === "profile"
                  ? `Welcome back, ${profile?.username || "Principal"}`
                  : activeTab === "students"
                    ? `${students.length} student${students.length !== 1 ? "s" : ""} enrolled`
                    : "Create and manage system users"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              className="hidden lg:flex p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 transition-all"
            >
              {dark ? (
                <SunIcon className="w-4 h-4" />
              ) : (
                <MoonIcon className="w-4 h-4" />
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

        <div className="px-4 sm:px-6 py-6 sm:py-8">
          {/* ══ PROFILE TAB ══════════════════════════════════════════════════════ */}
          {activeTab === "profile" && (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-colors duration-300">
                <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
                <div className="p-6 lg:p-8 flex flex-col gap-6">
                  {/* Avatar + Name */}
                  {loading ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-5 w-40 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-4 w-56 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
                        <div className="h-6 w-28 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse mt-1" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xl lg:text-2xl font-bold flex-shrink-0 ring-4 ring-indigo-100 dark:ring-indigo-900 shadow-sm">
                        {initials}
                      </div>
                      <div className="flex flex-col min-w-0 text-center sm:text-left">
                        <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                          {profile?.username}
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500 font-mono mt-1">
                          {profile?.email}
                        </span>
                        <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                          <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Active Principal
                          </span>
                          {profile?.designation && (
                            <span className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-100 dark:border-purple-900">
                              {profile.designation}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-100 dark:border-gray-800" />

                  {/* Contact Strip */}
                  {loading ? (
                    <div className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                  ) : (
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                          Contact Number
                        </p>
                        <p className="text-base lg:text-xl font-bold text-white font-mono tracking-wide mt-1 truncate">
                          {profile?.phone_number || "Not provided"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {profile?.office_room && (
                          <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                              Office Room
                            </p>
                            <p className="text-sm font-bold text-white mt-1">
                              {profile.office_room}
                            </p>
                          </div>
                        )}
                        <svg
                          className="w-8 h-8 text-white opacity-25 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Administrative Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                        Administrative Information
                      </span>
                      <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                    </div>
                    {loading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array(4)
                          .fill()
                          .map((_, i) => (
                            <SkeletonField key={i} />
                          ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ProfileField
                          label="Phone Number"
                          value={profile?.phone_number}
                          icon="📱"
                        />
                        <ProfileField
                          label="Admin Level"
                          value={profile?.admin_level}
                          icon="🏛️"
                        />
                        <ProfileField
                          label="Office Room"
                          value={profile?.office_room}
                          icon="🚪"
                        />
                        <ProfileField
                          label="Designation"
                          value={profile?.designation}
                          icon="👔"
                        />
                      </div>
                    )}
                  </div>

                  {/* Account Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                        Account Information
                      </span>
                      <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                    </div>
                    {loading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(2)].map((_, i) => (
                          <SkeletonField key={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ProfileField
                          label="Full Name"
                          value={profile?.username}
                          icon="👤"
                        />
                        <ProfileField
                          label="Email Address"
                          value={profile?.email}
                          icon="✉️"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ STUDENTS TAB ═════════════════════════════════════════════════════ */}
          {activeTab === "students" && (
            <div className="flex flex-col gap-6">
              {/* KPI Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Students",
                    value: students.length,
                    gradient: "from-green-500 to-emerald-500",
                    icon: "🎓",
                  },
                  {
                    label: "Classes",
                    value: [...new Set(students.map((s) => s.class_name))]
                      .length,
                    gradient: "from-indigo-600 to-blue-500",
                    icon: "🏫",
                  },
                  {
                    label: "Searching",
                    value: studentSearch
                      ? filteredStudents.length
                      : students.length,
                    gradient: "from-blue-500 to-cyan-500",
                    icon: "🔍",
                  },
                  {
                    label: "Avg Roll No.",
                    value:
                      students.length > 0
                        ? Math.round(
                            students.reduce((a, s) => a + s.roll_number, 0) /
                              students.length,
                          )
                        : 0,
                    gradient: "from-purple-500 to-indigo-500",
                    icon: "📋",
                  },
                ].map(({ label, value, gradient, icon }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                          {label}
                        </p>
                        <p
                          className={`mt-1.5 text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                        >
                          {value}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-lg shadow-sm`}
                      >
                        {icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Students Table Card */}
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500" />

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Student Directory
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {studentsLoading
                        ? "Loading students…"
                        : `${filteredStudents.length} of ${students.length} students`}
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name, class, admission…"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-52 sm:w-72 transition-all"
                    />
                    <svg
                      className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  {studentsLoading ? (
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          {[
                            "Student",
                            "Class",
                            "Roll No.",
                            "Admission No.",
                            "Address",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <SkeletonRow key={i} />
                          ))}
                      </tbody>
                    </table>
                  ) : students.length === 0 ? (
                    <div className="py-20 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center text-3xl">
                        🎓
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        No students found
                      </p>
                      <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">
                        Students will appear here once enrolled
                      </p>
                    </div>
                  ) : filteredStudents.length === 0 ? (
                    <div className="py-16 text-center">
                      <div className="text-4xl mb-3">🔍</div>
                      <p className="text-gray-400 dark:text-gray-500 text-sm">
                        No students match your search
                      </p>
                    </div>
                  ) : (
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          {[
                            "Student",
                            "Class",
                            "Roll No.",
                            "Admission No.",
                            "Address",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                        {filteredStudents.map((student) => (
                          <tr
                            key={student.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150"
                          >
                            {/* Student */}
                            <td className="px-4 sm:px-6 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                  {student.username.slice(0, 2).toUpperCase()}
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                  {student.username}
                                </span>
                              </div>
                            </td>
                            {/* Class */}
                            <td className="px-4 sm:px-6 py-3.5">
                              <ClassBadge name={student.class_name} />
                            </td>
                            {/* Roll No */}
                            <td className="px-4 sm:px-6 py-3.5">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-900">
                                {student.roll_number}
                              </span>
                            </td>
                            {/* Admission No */}
                            <td className="px-4 sm:px-6 py-3.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
                              {student.admission_number}
                            </td>
                            {/* Address */}
                            <td className="px-4 sm:px-6 py-3.5">
                              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <svg
                                  className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                  />
                                </svg>
                                <span className="capitalize">
                                  {student.address}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══ USER MANAGEMENT TAB ══════════════════════════════════════════════ */}
          {activeTab === "users" && (
            <div className="flex flex-col gap-6">
              {/* KPI Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Created",
                    value: users.length,
                    gradient: "from-indigo-600 to-blue-500",
                    icon: "👥",
                  },
                  {
                    label: "Teachers",
                    value: countByRole("teacher"),
                    gradient: "from-blue-500 to-cyan-500",
                    icon: "👨‍🏫",
                  },
                  {
                    label: "Students",
                    value: countByRole("student"),
                    gradient: "from-green-500 to-emerald-500",
                    icon: "🎓",
                  },
                  {
                    label: "Librarians",
                    value: countByRole("librarian"),
                    gradient: "from-purple-500 to-indigo-500",
                    icon: "📚",
                  },
                ].map(({ label, value, gradient, icon }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                          {label}
                        </p>
                        <p
                          className={`mt-1.5 text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                        >
                          {value}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-lg shadow-sm`}
                      >
                        {icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* User Table Card */}
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      System Users
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {filteredUsers.length} of {users.length} users
                      {users.length === 0 && " — create your first user below"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search users…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-36 sm:w-48 transition-all"
                      />
                      <svg
                        className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"
                        />
                      </svg>
                    </div>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      <option value="all">All Roles</option>
                      {ROLE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <PrimaryBtn onClick={() => setCreateModal(true)}>
                      <PlusIcon className="w-4 h-4" /> Create User
                    </PrimaryBtn>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  {users.length === 0 ? (
                    <div className="py-20 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 flex items-center justify-center text-3xl">
                        👥
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        No users created yet
                      </p>
                      <p className="text-gray-400 dark:text-gray-600 text-xs mt-1 mb-4">
                        Click "Create User" to add teachers, students or
                        librarians
                      </p>
                      <PrimaryBtn onClick={() => setCreateModal(true)}>
                        <PlusIcon className="w-4 h-4" /> Create First User
                      </PrimaryBtn>
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="py-16 text-center">
                      <div className="text-4xl mb-3">🔍</div>
                      <p className="text-gray-400 dark:text-gray-500 text-sm">
                        No users match your search
                      </p>
                    </div>
                  ) : (
                    <table className="w-full min-w-[560px]">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          {["User", "Email", "Role", "Created"].map((h) => (
                            <th
                              key={h}
                              className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                        {filteredUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150"
                          >
                            <td className="px-4 sm:px-6 py-3.5">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${ROLE_COLORS[user.role] || "from-gray-400 to-gray-500"} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                                >
                                  {user.username.slice(0, 2).toUpperCase()}
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {user.username}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-3.5 text-sm text-gray-500 dark:text-gray-400 font-mono text-xs">
                              {user.email}
                            </td>
                            <td className="px-4 sm:px-6 py-3.5">
                              <Badge role={user.role} />
                            </td>
                            <td className="px-4 sm:px-6 py-3.5 text-xs text-gray-400 dark:text-gray-500">
                              {new Date(user.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Role info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ROLE_OPTIONS.map(({ value, label }) => (
                  <div
                    key={value}
                    className="rounded-xl p-4 border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                    onClick={() => {
                      setUserForm((f) => ({ ...f, role: value }));
                      setCreateModal(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ROLE_COLORS[value]} flex items-center justify-center text-xl shadow-sm`}
                      >
                        {value === "teacher"
                          ? "👨‍🏫"
                          : value === "student"
                            ? "🎓"
                            : "📚"}
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
            </div>
          )}
        </div>
      </main>

      {/* ══ CREATE USER MODAL ══════════════════════════════════════════════════ */}
      {createModal && (
        <Modal
          title="Create New User"
          onClose={() => {
            setCreateModal(false);
            setUserForm(EMPTY_USER_FORM);
          }}
        >
          <form onSubmit={handleCreateUser} className="space-y-4">
            {userForm.role && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ROLE_COLORS[userForm.role]} flex items-center justify-center text-white text-sm`}
                >
                  {userForm.role === "teacher"
                    ? "👨‍🏫"
                    : userForm.role === "student"
                      ? "🎓"
                      : "📚"}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 capitalize">
                    Creating: {userForm.role}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    A profile will be created automatically
                  </p>
                </div>
              </div>
            )}

            <InputField
              label="Role"
              name="role"
              value={userForm.role}
              onChange={handleUserFormChange}
              options={ROLE_OPTIONS}
              required
            />
            <InputField
              label="Username"
              name="username"
              value={userForm.username}
              onChange={handleUserFormChange}
              placeholder="e.g. motilal"
              required
            />
            <InputField
              label="Email"
              name="email"
              value={userForm.email}
              onChange={handleUserFormChange}
              type="email"
              placeholder="e.g. motilal@gmail.com"
              required
            />
            <InputField
              label="Password"
              name="password"
              value={userForm.password}
              onChange={handleUserFormChange}
              type="password"
              placeholder="Min 8 characters"
              required
            />

            <div className="pt-1 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-700">
              ℹ️ Principal role cannot be created here — only one principal is
              allowed per system.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <SecondaryBtn
                onClick={() => {
                  setCreateModal(false);
                  setUserForm(EMPTY_USER_FORM);
                }}
              >
                Cancel
              </SecondaryBtn>
              <PrimaryBtn type="submit" disabled={submitting}>
                {submitting ? "Creating…" : "Create User"}
              </PrimaryBtn>
            </div>
          </form>
        </Modal>
      )}

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

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const ProfileIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

const GraduationIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
    />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
    />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const XIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m14.95 5.66-.7-.7M6.41 6.41l-.7-.7m12.02 0-.7.7M6.41 17.59l-.7.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z"
    />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
    />
  </svg>
);

const HamburgerIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
