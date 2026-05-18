
import {SunIcon ,MoonIcon,  HamburgerIcon} from "../icons/Icons"

export default function Topbar({ profile, activeTab, dark, toggleTheme, students, onMenuClick }) {
  const initials = profile?.username
    ? profile.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "PR";

  const getTabTitle = () => {
    switch(activeTab) {
      case "profile": return "Principal Dashboard";
      case "students": return "All Students";
      case "users": return "User Management";
      default: return "Principal Dashboard";
    }
  };

  const getTabSubtitle = () => {
    switch(activeTab) {
      case "profile": return `Welcome back, ${profile?.username || "Principal"}`;
      case "students": return `${students?.length || 0} student${students?.length !== 1 ? "s" : ""} enrolled`;
      case "users": return "Create and manage system users";
      default: return "";
    }
  };

  return (
    <header className="sticky top-0 z-20 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-all"
        >
          <HamburgerIcon className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">
            {getTabTitle()}
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
            {getTabSubtitle()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleTheme}
          className="hidden lg:flex p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 transition-all"
        >
          {dark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
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
  );
}