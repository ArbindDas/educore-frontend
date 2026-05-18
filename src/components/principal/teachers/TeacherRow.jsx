export default function TeacherRow({ teacher }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150">
      {/* Username */}
      <td className="px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {(teacher.username || "US").slice(0, 2).toUpperCase()}
          </div>

          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize block">
              {teacher.username || "Unknown User"}
            </span>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              ID: {teacher.id || "N/A"}
            </span>
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="px-4 sm:px-6 py-3.5">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
          {teacher.phone_number}
        </span>
      </td>

      {/* Experience */}
      <td className="px-4 sm:px-6 py-3.5 text-sm text-gray-700 dark:text-gray-300">
        {teacher.experience}
      </td>

      {/* Qualification */}
      <td className="px-4 sm:px-6 py-3.5 text-sm text-gray-500 dark:text-gray-400">
        {teacher.qualification || "—"}
      </td>

      {/* Joined */}
      <td className="px-4 sm:px-6 py-3.5 text-xs text-gray-400 dark:text-gray-500">
        {teacher.joining_date
          ? new Date(teacher.joining_date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : "—"}
      </td>
    </tr>
  );
}
