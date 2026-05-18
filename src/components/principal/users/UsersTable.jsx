
import UserRow from "./UserRow";
import { PrimaryBtn } from "../common/PrimaryBtn";
import { PlusIcon } from "../icons/Icons";
import { ROLE_OPTIONS } from "../../../constant/principalConstants";

export default function UsersTable({ users, filteredUsers, filterRole, setFilterRole, search, setSearch, onCreateUser }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            System Users
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {filteredUsers.length} of {users.length} users
            {users.length === 0 && " — create your first user below"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-36 sm:w-48 transition-all"
            />
            <svg
              className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"
              />
            </svg>
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="all">All Roles</option>
            {ROLE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <PrimaryBtn onClick={onCreateUser}>
            <PlusIcon className="w-4 h-4" /> Create User
          </PrimaryBtn>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 flex items-center justify-center text-3xl">
              👥
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              No users created yet
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-xs mt-1 mb-4">
              Click "Create User" to add teachers, students or librarians
            </p>
            <PrimaryBtn onClick={onCreateUser}>
              <PlusIcon className="w-4 h-4" /> Create First User
            </PrimaryBtn>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              No users match your search
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["User", "Email", "Role", "Created"].map((h) => (
                  <th key={h} className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {filteredUsers.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}