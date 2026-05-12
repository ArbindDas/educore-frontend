// Unauthorized.jsx — EduCore ERP
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function Unauthorized() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const handleDashboard = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const routes = {
      principal: "/principal",
      teacher: "/teacher",
      student: "/student",
      librarian: "/librarian",
    };
    navigate(routes[user.role] || "/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-10 text-center shadow-sm">

        {/* Icon */}
        <div className="w-18 h-18 mx-auto mb-6 w-[72px] h-[72px] rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-4">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          403 — Access denied
        </span>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          You don't have permission
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-xs mx-auto">
          This page is restricted to specific roles. If you believe this is a mistake, contact your administrator.
        </p>

        <div className="border-t border-gray-100 dark:border-gray-700 mb-8" />

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDashboard}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                       bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]
                       text-white text-sm font-medium rounded-lg
                       transition-all duration-200 ease-in-out"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to my dashboard
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                       bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30
                       text-red-600 dark:text-red-400 text-sm font-medium rounded-lg
                       border border-red-200 dark:border-red-800
                       transition-all duration-200 ease-in-out"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log out
          </button>
        </div>

        {/* Footer meta */}
        <p className="mt-6 text-xs text-gray-400 dark:text-gray-600 flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          EduCore ERP &nbsp;·&nbsp; Role-based access control
        </p>

      </div>
    </div>
  );
}