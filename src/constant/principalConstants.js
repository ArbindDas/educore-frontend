export const ROLE_OPTIONS = [
  { value: "teacher", label: "👨‍🏫 Teacher" },
  { value: "student", label: "🎓 Student" },
  { value: "librarian", label: "📚 Librarian" },
];

export const EMPTY_USER_FORM = {
  username: "",
  email: "",
  password: "",
  role: "",
};

export const ROLE_COLORS = {
  teacher: "from-blue-500 to-cyan-500",
  student: "from-green-500 to-emerald-500",
  librarian: "from-purple-500 to-indigo-500",
};

export const TEACHER_STATUS = {
  active: "Active",
  inactive: "InActive",
  on_leave: "On Leave",
};

export const TEACHER_DEPARTMENTS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Computer Science",
  "Physical Education",
  "Programming",
];

// ✅ Experience level options
export const EXPERIENCE_OPTIONS = [
  { value: "Fresher", label: "Fresher (0-1 years)" },
  { value: "1-3 years", label: "1-3 years" },
  { value: "3-5 years", label: "3-5 years" },
  { value: "5-10 years", label: "5-10 years" },
  { value: "10+ years", label: "10+ years" },
];