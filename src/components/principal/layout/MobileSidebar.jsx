import Sidebar from "./Sidebar";

export default function MobileSidebar({ profile, activeTab, setActiveTab, navItems, dark, toggleTheme, onClose }) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="relative w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-2xl">
        <Sidebar 
          profile={profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navItems={navItems}
          dark={dark}
          toggleTheme={toggleTheme}
          onClose={onClose}
        />
      </aside>
    </div>
  );
}