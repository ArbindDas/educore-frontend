// Navbar.jsx — EduCore ERP
// Dependencies: react-router-dom, lucide-react
// Install: npm install react-router-dom lucide-react

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sun, Moon, Bell, Calendar,
  Search, ChevronDown, Menu, School,
  LogIn, UserPlus,
} from "lucide-react";

const ROLE_STYLES = {
  Admin:     "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  Principal: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  Teacher:   "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  Student:   "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
};

// Reusable icon button style
const iconBtnCls = `
  w-[34px] h-[34px] rounded-lg flex items-center justify-center cursor-pointer
  text-gray-500 dark:text-gray-400
  border border-gray-200 dark:border-gray-700
  hover:bg-gray-50 dark:hover:bg-gray-800
  hover:text-gray-900 dark:hover:text-white
  transition-all duration-200
`.trim();

export default function Navbar({
  user = { name: "Aarav Khanal", role: "Admin", initials: "AK" },
  breadcrumb = [{ label: "Dashboard", to: "/dashboard" }, { label: "Overview" }],
  onMenuToggle,
  notificationCount = 3,
  isAuthenticated = true, // set false to show Login/Signup instead of avatar
}) {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav
      className="
        sticky top-0 z-50 h-[60px]
        flex items-center justify-between px-6
        bg-white dark:bg-gray-900
        border-b border-gray-200 dark:border-gray-700
        transition-colors duration-300
      "
    >
      {/* ── Left: hamburger + logo + breadcrumb ── */}
      <div className="flex items-center gap-4">

        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className={`lg:hidden ${iconBtnCls}`}
          aria-label="Toggle sidebar menu"
        >
          <Menu size={18} />
        </button>

        {/* Logo → uses Link instead of <a> */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="
              w-[34px] h-[34px] rounded-[9px]
              bg-gradient-to-br from-indigo-500 to-blue-500
              flex items-center justify-center
              group-hover:opacity-90 transition-opacity
            "
          >
            <School size={17} className="text-white" />
          </div>
          <span className="text-[17px] font-medium text-gray-900 dark:text-white tracking-tight">
            Edu<span className="text-indigo-500">Core</span>
          </span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-[22px] bg-gray-200 dark:bg-gray-700" />

        {/* Breadcrumb — uses Link for crumbs that have a `to` prop */}
        <nav
          className="hidden md:flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400"
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((crumb, i) => {
            const isLast = i === breadcrumb.length - 1;
            return (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronDown size={11} className="-rotate-90 opacity-40" />
                )}
                {crumb.to && !isLast ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "text-gray-900 dark:text-white font-medium"
                        : ""
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* ── Center: search ── */}
      <div className="hidden md:block">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search students, classes…"
            aria-label="Search"
            className="
              pl-8 pr-3 py-1.5 text-[13px]
              w-56 focus:w-64 transition-all duration-200
              bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-lg outline-none
              focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
              text-gray-900 dark:text-white placeholder:text-gray-400
            "
          />
        </div>
      </div>

      {/* ── Right: actions + auth ── */}
      <div className="flex items-center gap-1.5">

        {/* Notifications */}
        <button className={`relative ${iconBtnCls}`} aria-label="Notifications">
          <Bell size={17} />
          {notificationCount > 0 && (
            <span
              className="
                absolute top-1 right-1 w-1.5 h-1.5 rounded-full
                bg-indigo-500 ring-2 ring-white dark:ring-gray-900
              "
            />
          )}
        </button>

        {/* Calendar */}
        <button className={iconBtnCls} aria-label="Calendar">
          <Calendar size={17} />
        </button>

        {/* Dark / light toggle */}
        <button
          onClick={() => setDark(!dark)}
          className={iconBtnCls}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* ── Auth section ── */}
        {isAuthenticated ? (
          /* Avatar pill — shown when logged in */
          <button
            className="
              flex items-center gap-2 ml-1
              pl-1 pr-2.5 py-1 rounded-full
              border border-gray-200 dark:border-gray-700
              hover:bg-gray-50 dark:hover:bg-gray-800
              transition-all duration-200
            "
            aria-label="Open user menu"
          >
            {/* Avatar circle */}
            <div
              className="
                w-7 h-7 rounded-full flex items-center justify-center
                text-[11px] font-medium text-white
                bg-gradient-to-br from-indigo-500 to-blue-500
              "
            >
              {user.initials}
            </div>

            {/* Name + role badge */}
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[12px] font-medium text-gray-900 dark:text-white">
                {user.name}
              </span>
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${ROLE_STYLES[user.role]}`}
              >
                {user.role}
              </span>
            </div>

            <ChevronDown size={12} className="text-gray-400 ml-0.5" />
          </button>
        ) : (
          /* Login + Signup — shown when NOT logged in */
          <div className="flex items-center gap-2 ml-1">

            {/* Login — outline style */}
            <Link
              to="/login"
              className="
                flex items-center gap-1.5
                px-3 py-1.5 rounded-lg text-[13px] font-medium
                border border-gray-200 dark:border-gray-700
                text-gray-700 dark:text-gray-300
                hover:bg-gray-50 dark:hover:bg-gray-800
                transition-all duration-200
              "
            >
              <LogIn size={14} />
              Login
            </Link>

            {/* Signup — filled indigo */}
            <Link
              to="/signup"
              className="
                flex items-center gap-1.5
                px-3 py-1.5 rounded-lg text-[13px] font-medium
                bg-indigo-600 hover:bg-indigo-700
                text-white transition-all duration-200
                active:scale-[0.98]
              "
            >
              <UserPlus size={14} />
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
