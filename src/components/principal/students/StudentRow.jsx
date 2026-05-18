
import ClassBadge from "./ClassBadge";

export default function StudentRow({ student }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150">
      {/* Student */}
      <td className="px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {student.username.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
            {student.username}
          </span>
        </div>
      </td>
      {/* Class */}
      <td className="px-4 sm:px-6 py-3.5">
        <ClassBadge name={student.class_name} />
      </td>
      {/* Roll No */}
      <td className="px-4 sm:px-6 py-3.5">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-900">
          {student.roll_number}
        </span>
      </td>
      {/* Admission No */}
      <td className="px-4 sm:px-6 py-3.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
        {student.admission_number}
      </td>
      {/* Address */}
      <td className="px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <svg
            className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <span className="capitalize">{student.address}</span>
        </div>
      </td>
    </tr>
  );
}