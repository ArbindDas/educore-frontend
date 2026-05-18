

import Badge from "./Badge";

import { ROLE_COLORS } from "../../../constant/principalConstants";

export default function UserRow({ user }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150">
      <td className="px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${ROLE_COLORS[user.role] || "from-gray-400 to-gray-500"} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
          >
            {user.username.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {user.username}
          </span>
        </div>
      </td>
      <td className="px-4 sm:px-6 py-3.5 text-sm text-gray-500 dark:text-gray-400 font-mono text-xs">
        {user.email}
      </td>
      <td className="px-4 sm:px-6 py-3.5">
        <Badge role={user.role} />
      </td>
      <td className="px-4 sm:px-6 py-3.5 text-xs text-gray-400 dark:text-gray-500">
        {new Date(user.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
    </tr>
  );
}