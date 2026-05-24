import { ProfileIcon, GraduationIcon, UsersIcon, SunIcon, MoonIcon } from "../icons/Icons";

const SidebarContent = ({ profile, activeTab, setActiveTab, navItems, dark, toggleTheme, onClose }) => {
  const initials = profile?.username
    ? profile.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "PR";

  const getIcon = (iconName) => {
    switch(iconName) {
      case "Profile": return ProfileIcon;
      case "Graduation": return GraduationIcon;
      case "Users": return UsersIcon;
      default: return ProfileIcon;
    }
  };

  return (
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
        {navItems.map(({ id, label, icon, badge }) => {
          const Icon = getIcon(icon);
          return (
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
          );
        })}
      </nav>

      {/* Theme toggle */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={toggleTheme}
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
};

const XIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default SidebarContent;
