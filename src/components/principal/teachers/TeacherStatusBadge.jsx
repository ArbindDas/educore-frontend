export default function TeacherStatusBadge({ status }) {
  const statusConfig = {
    active: {
      color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
      icon: "✅",
      label: "Active"
    },
    inactive: {
      color: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800",
      icon: "⭕",
      label: "Inactive"
    },
    on_leave: {
      color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
      icon: "🌴",
      label: "On Leave"
    }
  };

  const config = statusConfig[status] || statusConfig.inactive;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.color}`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}