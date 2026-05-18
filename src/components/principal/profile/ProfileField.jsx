export default function ProfileField({ label, value, icon }) {
  return (
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
}