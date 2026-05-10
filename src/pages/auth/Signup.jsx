// Signup.jsx — EduCore ERP
import { useState, useEffect } from "react";

const ROLES = ["Admin", "Principal", "Teacher", "Student"];

const ROLE_BADGE = {
  Admin: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Principal: "bg-purple-50 text-purple-700 border-purple-200",
  Teacher: "bg-blue-50 text-blue-700 border-blue-200",
  Student: "bg-green-50 text-green-700 border-green-200",
};

function InputField({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  rightEl,
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-gray-200
                     dark:border-gray-700 bg-white dark:bg-gray-800
                     text-gray-900 dark:text-white placeholder:text-gray-400
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
                     transition-all"
        />
        {rightEl && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightEl}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const set = (field) => (e) =>
    setForm((p) => ({
      ...p,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.includes("@")) errs.email = "Invalid email";
    if (!form.role) errs.role = "Select a role";
    if (form.password.length < 8) errs.password = "Min 8 characters";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords don't match";
    if (!form.agreeTerms) errs.agreeTerms = "You must agree to the terms";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // Replace with your Django register endpoint
    // await fetch("/api/auth/register/", { method:"POST", body: JSON.stringify(form) });
    setTimeout(() => setLoading(false), 1500);
  };

  const EyeIcon = ({ show, toggle }) => (
    <button
      type="button"
      onClick={toggle}
      className="text-gray-400 hover:text-gray-600"
    >
      {show ? (
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
  );

  const MailIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const LockIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );

  const UserIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-[420px] xl:w-[480px] flex-col justify-between
                      bg-indigo-600 p-10 relative overflow-hidden shrink-0"
      >
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${(i + 1) * 130}px`,
                height: `${(i + 1) * 130}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        {/* Logo + toggle */}
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
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"
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

        <div className="relative z-10">
          <h1 className="text-3xl font-semibold text-white leading-snug mb-3">
            Join EduCore
            <br />
            today.
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
            Set up your institution in minutes. Manage everything from one
            elegant dashboard.
          </p>

          {/* Feature list */}
          {[
            "Role-based access for all staff",
            "Real-time attendance tracking",
            "Academic reports & analytics",
            "Library & resource management",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2.5 mb-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-white/70">{f}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} EduCore. All rights reserved.
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 overflow-y-auto">
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
            Create your account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Get started with EduCore in under 2 minutes
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  First name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={set("firstName")}
                    placeholder="Aarav"
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border
                                ${errors.firstName ? "border-red-400" : "border-gray-200 dark:border-gray-700"}
                                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                placeholder:text-gray-400 focus:outline-none focus:ring-2
                                focus:ring-indigo-500/30 focus:border-indigo-500 transition-all`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Last name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={set("lastName")}
                    placeholder="Khanal"
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border
                                ${errors.lastName ? "border-red-400" : "border-gray-200 dark:border-gray-700"}
                                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                placeholder:text-gray-400 focus:outline-none focus:ring-2
                                focus:ring-indigo-500/30 focus:border-indigo-500 transition-all`}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@school.edu"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border
                              ${errors.email ? "border-red-400" : "border-gray-200 dark:border-gray-700"}
                              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                              placeholder:text-gray-400 focus:outline-none focus:ring-2
                              focus:ring-indigo-500/30 focus:border-indigo-500 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Your role
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, role: r }))}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all
                                ${
                                  form.role === r
                                    ? ROLE_BADGE[r]
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300"
                                }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              {errors.role && (
                <p className="text-xs text-red-500 mt-1">{errors.role}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <LockIcon />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Min. 8 characters"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border
                              ${errors.password ? "border-red-400" : "border-gray-200 dark:border-gray-700"}
                              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                              placeholder:text-gray-400 focus:outline-none focus:ring-2
                              focus:ring-indigo-500/30 focus:border-indigo-500 transition-all`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <EyeIcon
                    show={showPass}
                    toggle={() => setShowPass(!showPass)}
                  />
                </span>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <LockIcon />
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  placeholder="Repeat your password"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border
                              ${errors.confirmPassword ? "border-red-400" : "border-gray-200 dark:border-gray-700"}
                              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                              placeholder:text-gray-400 focus:outline-none focus:ring-2
                              focus:ring-indigo-500/30 focus:border-indigo-500 transition-all`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <EyeIcon
                    show={showConfirm}
                    toggle={() => setShowConfirm(!showConfirm)}
                  />
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={set("agreeTerms")}
                  className="mt-0.5 w-3.5 h-3.5 accent-indigo-600 shrink-0"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-red-500 mt-1">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]
                         disabled:opacity-60 text-white text-sm font-medium rounded-xl
                         transition-all duration-150 flex items-center justify-center gap-2 mt-2"
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
                  Creating account…
                </>
              ) : (
                "Create my account"
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
          <button
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
            Sign up with Google
          </button>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
