// // Login.jsx — EduCore ERP
// import { useState, useEffect } from "react";
// import { authService } from "../../services/authService";

// const ROLES = [
//   { label: "librarian", icon: "🛡️", color: "indigo" },
//   { label: "principal", icon: "🏫", color: "purple" },
//   { label: "teacher", icon: "📋", color: "blue" },
//   { label: "student", icon: "🎓", color: "green" },
// ];

// const ROLE_STYLES = {
//   indigo: {
//     active: "bg-indigo-50 border-indigo-500 text-indigo-600",
//     idle: "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
//   },
//   purple: {
//     active: "bg-purple-50 border-purple-500 text-purple-600",
//     idle: "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
//   },
//   blue: {
//     active: "bg-blue-50 border-blue-500 text-blue-600",
//     idle: "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
//   },
//   green: {
//     active: "bg-green-50 border-green-500 text-green-600",
//     idle: "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
//   },
// };

// // ── Validation rules (same as Signup) ───────────────────────────────────────
// const validators = {
//   email: (v) => {
//     if (!v.trim()) return "Required";
//     if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v))
//       return "Invalid email address";
//     return "";
//   },
//   password: (v) => {
//     if (!v) return "Required";
//     if (v.length < 6) return "Min 6 characters";
//     if (!/[A-Z]/.test(v)) return "Must include an uppercase letter";
//     if (!/[0-9]/.test(v)) return "Must include a number";
//     return "";
//   },
// };

// export default function Login() {
//   const [role, setRole] = useState("Admin");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [remember, setRemember] = useState(false);
//   const [dark, setDark] = useState(
//     () => localStorage.getItem("theme") === "dark",
//   );
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // ── touched: errors only show after the user has interacted ─────────────
//   const [touched, setTouched] = useState({
//     email: false,
//     password: false,
//   });

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//     localStorage.setItem("theme", dark ? "dark" : "light");
//   }, [dark]);

//   // ── handleChange: real-time validation for email / password ─────────────
//   const handleChange = (field) => (e) => {
//     const value = e.target.value;
//     if (field === "email") setEmail(value);
//     if (field === "password") setPassword(value);

//     setTouched((prev) => ({ ...prev, [field]: true }));
//     if (validators[field]) {
//       setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
//     }
//   };

//   // ── handleBlur: mark field touched + run validation immediately ─────────
//   const handleBlur = (field) => () => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//     if (validators[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: validators[field](field === "email" ? email : password),
//       }));
//     }
//   };

//   const validate = () => {
//     const errs = {};
//     const eErr = validators.email(email);
//     if (eErr) errs.email = eErr;
//     const pErr = validators.password(password);
//     if (pErr) errs.password = pErr;
//     return errs;
//   };

//   // ── submit button disabled until everything is valid ────────────────────
//   const isFormValid =
//     !validators.email(email) && !validators.password(password);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//     // 2. LOGIN (use username, NOT email unless backend supports email login)
//     await authService.login(username, password);

//     // 3. GET USER
//     const user = await authService.getMe();

//     localStorage.setItem("user", JSON.stringify(user));

//     // 4. REDIRECT
//     if (user.role === "principal") {
//       navigate("/admin");
//     } else if (user.role === "teacher") {
//       navigate("/teacher");
//     } else if (user.role === "librarian") {
//       navigate("/library");
//     } else {
//       navigate("/student");
//     }

//   } catch (err) {
//     console.log(err.response?.data || err);
//     setErrors({ login: "Invalid credentials" });
//   } finally {
//     setLoading(false);
//   }

//     // Mark all fields as touched on submit attempt
//     setTouched({ email: true, password: true });
//     const errs = validate();
//     if (Object.keys(errs).length) {
//       setErrors(errs);
//       return;
//     }
//     setErrors({});
//     setLoading(true);
//     // Replace with your Django auth endpoint
//     // await fetch("/api/auth/login/", { method:"POST", body: JSON.stringify({ email, password, role }) });
//     setTimeout(() => {
//       setLoading(false);
//     }, 1500);
//   };

//   // Border class helper for real-time fields
//   const fieldBorder = (field) => {
//     if (!touched[field]) return "border-gray-200 dark:border-gray-700";
//     return errors[field]
//       ? "border-red-400 focus:ring-red-400/30 focus:border-red-400"
//       : "border-green-400 focus:ring-green-400/30 focus:border-green-400";
//   };

//   // Inline icon helper for real-time fields
//   const FieldIcon = ({ field }) =>
//     touched[field] ? (
//       errors[field] ? (
//         <svg
//           className="w-4 h-4 text-red-400"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={2}
//           viewBox="0 0 24 24"
//         >
//           <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       ) : (
//         <svg
//           className="w-4 h-4 text-green-500"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={2}
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M5 13l4 4L19 7"
//           />
//         </svg>
//       )
//     ) : null;

//   return (
//     <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
//       {/* ── Left panel ── */}
//       <div
//         className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between
//                       bg-indigo-600 p-10 relative overflow-hidden shrink-0"
//       >
//         {/* Background pattern */}
//         <div className="absolute inset-0 opacity-10">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full border border-white"
//               style={{
//                 width: `${(i + 1) * 120}px`,
//                 height: `${(i + 1) * 120}px`,
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%,-50%)",
//               }}
//             />
//           ))}
//         </div>

//         {/* Logo */}
//         <div className="flex items-center gap-3 relative z-10">
//           <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
//             <svg
//               className="w-5 h-5 text-white"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 3L1 9l11 6 11-6-11-6zM1 15l11 6 11-6M1 9v6m22-6v6"
//               />
//             </svg>
//           </div>
//           <span className="text-xl font-semibold text-white tracking-tight">
//             Edu<span className="text-white/60">Core</span>
//           </span>
//           {/* Dark mode toggle */}
//           <button
//             onClick={() => setDark(!dark)}
//             className="ml-auto w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20
//                        flex items-center justify-center transition-colors"
//             aria-label="Toggle theme"
//           >
//             {dark ? (
//               <svg
//                 className="w-4 h-4 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <circle cx="12" cy="12" r="5" />
//                 <path
//                   strokeLinecap="round"
//                   d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="w-4 h-4 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Hero text */}
//         <div className="relative z-10">
//           <h1 className="text-3xl font-semibold text-white leading-snug mb-4">
//             The modern ERP
//             <br />
//             for education.
//           </h1>
//           <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xs">
//             Manage students, teachers, attendance, and academics — all from one
//             unified platform.
//           </p>
//           <div className="flex gap-8">
//             {[
//               ["12k+", "Students"],
//               ["340+", "Teachers"],
//               ["98%", "Uptime"],
//             ].map(([n, l]) => (
//               <div key={l}>
//                 <div className="text-2xl font-semibold text-white">{n}</div>
//                 <div className="text-xs text-white/50 mt-0.5">{l}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Testimonial */}
//         <div className="relative z-10 bg-white/10 rounded-xl p-4">
//           <p className="text-white/80 text-sm leading-relaxed mb-3">
//             "EduCore transformed how we manage our school. The dashboard is
//             clean and everything just works."
//           </p>
//           <div className="flex items-center gap-2">
//             <div
//               className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center
//                             text-xs font-medium text-white"
//             >
//               PD
//             </div>
//             <div>
//               <div className="text-xs font-medium text-white">Priya Dewan</div>
//               <div className="text-xs text-white/50">
//                 Principal, DPS Kathmandu
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Right panel (form) ── */}
//       <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
//         {/* Mobile logo */}
//         <div className="lg:hidden flex items-center gap-2 mb-8">
//           <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
//             <svg
//               className="w-4 h-4 text-white"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 3L1 9l11 6 11-6-11-6zM1 15l11 6 11-6"
//               />
//             </svg>
//           </div>
//           <span className="text-lg font-semibold text-gray-900 dark:text-white">
//             Edu<span className="text-indigo-500">Core</span>
//           </span>
//         </div>

//         <div className="w-full max-w-md">
//           <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
//             Welcome back
//           </h2>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//             Sign in to your EduCore account
//           </p>

//           {/* Role selector */}
//           <div className="grid grid-cols-4 gap-2 mb-6">
//             {ROLES.map(({ label, icon, color }) => (
//               <button
//                 key={label}
//                 onClick={() => setRole(label)}
//                 className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border
//                             text-xs font-medium transition-all duration-150
//                             ${
//                               role === label
//                                 ? ROLE_STYLES[color].active
//                                 : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300"
//                             }`}
//               >
//                 <span className="text-base">{icon}</span>
//                 {label}
//               </button>
//             ))}
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* ── Email — real-time validated ── */}
//             <div>
//               <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
//                 Email address
//               </label>
//               <div className="relative">
//                 <svg
//                   className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={handleChange("email")}
//                   onBlur={handleBlur("email")}
//                   placeholder="you@school.edu"
//                   className={`w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border transition-all
//                              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
//                              placeholder:text-gray-400 focus:outline-none focus:ring-2
//                              focus:ring-indigo-500/30 ${fieldBorder("email")}`}
//                 />
//                 <span className="absolute right-3 top-1/2 -translate-y-1/2">
//                   <FieldIcon field="email" />
//                 </span>
//               </div>
//               {touched.email && errors.email && (
//                 <p className="text-xs text-red-500 mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* ── Password — real-time validated ── */}
//             <div>
//               <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
//                 Password
//               </label>
//               <div className="relative">
//                 <svg
//                   className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   viewBox="0 0 24 24"
//                 >
//                   <rect x="3" y="11" width="18" height="11" rx="2" />
//                   <path d="M7 11V7a5 5 0 0110 0v4" />
//                 </svg>
//                 <input
//                   type={showPass ? "text" : "password"}
//                   value={password}
//                   onChange={handleChange("password")}
//                   onBlur={handleBlur("password")}
//                   placeholder="Enter your password"
//                   className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border transition-all
//                              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
//                              placeholder:text-gray-400 focus:outline-none focus:ring-2
//                              focus:ring-indigo-500/30 ${fieldBorder("password")}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPass ? (
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
//                     </svg>
//                   ) : (
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                       <circle cx="12" cy="12" r="3" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {touched.password && errors.password && (
//                 <p className="text-xs text-red-500 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Remember + Forgot */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={remember}
//                   onChange={(e) => setRemember(e.target.checked)}
//                   className="rounded accent-indigo-600 w-3.5 h-3.5"
//                 />
//                 Remember me
//               </label>
//               <a
//                 href="/forgot-password"
//                 className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Submit — disabled until form is valid */}
//             <button
//               type="submit"
//               disabled={loading || !isFormValid}
//               className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]
//                          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600
//                          text-white text-sm font-medium rounded-xl
//                          transition-all duration-150 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="w-4 h-4 animate-spin"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8H4z"
//                     />
//                   </svg>{" "}
//                   Signing in…
//                 </>
//               ) : (
//                 `Sign in as ${role}`
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-5">
//             <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
//             <span className="text-xs text-gray-400">or</span>
//             <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
//           </div>

//           {/* Google */}
//           <button
//             className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4
//                              border border-gray-200 dark:border-gray-700 rounded-xl text-sm
//                              font-medium text-gray-700 dark:text-gray-300
//                              hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
//           >
//             <svg className="w-4 h-4" viewBox="0 0 24 24">
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Continue with Google
//           </button>

//           <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
//             Don't have an account?{" "}
//             <a
//               href="/signup"
//               className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
//             >
//               Create one
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// Login.jsx — EduCore ERP
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import { authService } from "../../services/authService";

const ROLES = [
  { label: "librarian", icon: "🛡️", color: "indigo" },
  { label: "principal", icon: "🏫", color: "purple" },
  { label: "teacher", icon: "📋", color: "blue" },
  { label: "student", icon: "🎓", color: "green" },
];

const ROLE_STYLES = {
  indigo: {
    active: "bg-indigo-50 border-indigo-500 text-indigo-600",
    idle: "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
  },
  purple: {
    active: "bg-purple-50 border-purple-500 text-purple-600",
    idle: "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
  },
  blue: {
    active: "bg-blue-50 border-blue-500 text-blue-600",
    idle: "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
  },
  green: {
    active: "bg-green-50 border-green-500 text-green-600",
    idle: "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
  },
};

// ── Validation rules ─────────────────────────────────────────────────────────
const validators = {
  username: (v) => {
    if (!v.trim()) return "Required";
    if (v.trim().length < 3) return "Min 3 characters";
    return "";
  },
  password: (v) => {
    if (!v) return "Required";
    if (v.length < 6) return "Min 6 characters";
    if (!/[A-Z]/.test(v)) return "Must include an uppercase letter";
    if (!/[0-9]/.test(v)) return "Must include a number";
    return "";
  },
};

export default function Login() {
  const navigate = useNavigate(); // ADD THIS HOOK
  const [role, setRole] = useState("Admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ── touched: errors only show after the user has interacted ─────────────
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // ── handleChange: real-time validation for username / password ───────────
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);

    setTouched((prev) => ({ ...prev, [field]: true }));
    if (validators[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  // ── handleBlur: mark field touched + run validation immediately ──────────
  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (validators[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validators[field](field === "username" ? username : password),
      }));
    }
  };

  const validate = () => {
    const errs = {};
    const uErr = validators.username(username);
    if (uErr) errs.username = uErr;
    const pErr = validators.password(password);
    if (pErr) errs.password = pErr;
    return errs;
  };

  // ── submit button disabled until everything is valid ────────────────────
  const isFormValid =
    !validators.username(username) && !validators.password(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched on submit attempt
    setTouched({ username: true, password: true });
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // 1. LOGIN
      await authService.login(username, password);

      // 2. GET USER
      const user = await authService.getMe();

      localStorage.setItem("user", JSON.stringify(user));
      if (remember) {
        localStorage.setItem("rememberedUser", username);
      }

      // 3. REDIRECT based on role
      if (user.role === "principal") {
        navigate("/principal");
      } else if (user.role === "teacher") {
        navigate("/teacher");
      } else if (user.role === "librarian") {
        navigate("/librarian");
      } else {
        navigate("/student");
      }
    } catch (err) {
      console.log("FULL ERROR:", err.data);
      console.log("RESPONSE:", err.response?.data);
      console.log("LOGIN DATA:", username, password);
      console.log(err.response?.data || err);
      setErrors({ login: "Invalid credentials" });  
      setLoading(false);
    }
  };

  // Border class helper for real-time fields
  const fieldBorder = (field) => {
    if (!touched[field]) return "border-gray-200 dark:border-gray-700";
    return errors[field]
      ? "border-red-400 focus:ring-red-400/30 focus:border-red-400"
      : "border-green-400 focus:ring-green-400/30 focus:border-green-400";
  };

  // Inline icon helper for real-time fields
  const FieldIcon = ({ field }) =>
    touched[field] ? (
      errors[field] ? (
        <svg
          className="w-4 h-4 text-red-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )
    ) : null;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between
                      bg-indigo-600 p-10 relative overflow-hidden shrink-0"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3L1 9l11 6 11-6-11-6zM1 15l11 6 11-6M1 9v6m22-6v6"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold text-white tracking-tight">
            Edu<span className="text-white/60">Core</span>
          </span>
          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="ml-auto w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20
                       flex items-center justify-center transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5" />
                <path
                  strokeLinecap="round"
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Hero text */}
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold text-white leading-snug mb-4">
            The modern ERP
            <br />
            for education.
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xs">
            Manage students, teachers, attendance, and academics — all from one
            unified platform.
          </p>
          <div className="flex gap-8">
            {[
              ["12k+", "Students"],
              ["340+", "Teachers"],
              ["98%", "Uptime"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-semibold text-white">{n}</div>
                <div className="text-xs text-white/50 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 rounded-xl p-4">
          <p className="text-white/80 text-sm leading-relaxed mb-3">
            "EduCore transformed how we manage our school. The dashboard is
            clean and everything just works."
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center
                            text-xs font-medium text-white"
            >
              PD
            </div>
            <div>
              <div className="text-xs font-medium text-white">Priya Dewan</div>
              <div className="text-xs text-white/50">
                Principal, DPS Kathmandu
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3L1 9l11 6 11-6-11-6zM1 15l11 6 11-6"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Edu<span className="text-indigo-500">Core</span>
          </span>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Sign in to your EduCore account
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {ROLES.map(({ label, icon, color }) => (
              <button
                key={label}
                onClick={() => setRole(label)}
                className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border
                            text-xs font-medium transition-all duration-150
                            ${
                              role === label
                                ? ROLE_STYLES[color].active
                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                            }`}
              >
                <span className="text-base">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Display login error if any */}
            {errors.login && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.login}
                </p>
              </div>
            )}

            {/* ── Username — real-time validated ── */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Username
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
                <input
                  type="text"
                  value={username}
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")}
                  placeholder="Enter your username"
                  className={`w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border transition-all
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             placeholder:text-gray-400 focus:outline-none focus:ring-2
                             focus:ring-indigo-500/30 ${fieldBorder("username")}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <FieldIcon field="username" />
                </span>
              </div>
              {touched.username && errors.username && (
                <p className="text-xs text-red-500 mt-1">{errors.username}</p>
              )}
            </div>

            {/* ── Password — real-time validated ── */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholder="Enter your password"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border transition-all
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             placeholder:text-gray-400 focus:outline-none focus:ring-2
                             focus:ring-indigo-500/30 ${fieldBorder("password")}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded accent-indigo-600 w-3.5 h-3.5"
                />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit — disabled until form is valid */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600
                         text-white text-sm font-medium rounded-xl
                         transition-all duration-150 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>{" "}
                  Signing in…
                </>
              ) : (
                `Sign in as ${role}`
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Google */}
          {/* <button
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4
                             border border-gray-200 dark:border-gray-700 rounded-xl text-sm
                             font-medium text-gray-700 dark:text-gray-300
                             hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button> */}

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
