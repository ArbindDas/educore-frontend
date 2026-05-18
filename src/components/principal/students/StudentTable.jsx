
import StudentRow from "./StudentRow";
import { SkeletonRow } from "../common/SkeletonField";

export default function StudentTable({ students, loading, search, setSearch, filteredStudents }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500" />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Student Directory
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {loading
              ? "Loading students…"
              : `${filteredStudents.length} of ${students.length} students`}
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, class, admission…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-52 sm:w-72 transition-all"
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Student", "Class", "Roll No.", "Admission No.", "Address"].map((h) => (
                  <th key={h} className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(5).fill().map((_, i) => <SkeletonRow key={i} />)}
            </tbody>
          </table>
        ) : students.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center text-3xl">
              🎓
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              No students found
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">
              Students will appear here once enrolled
            </p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              No students match your search
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Student", "Class", "Roll No.", "Admission No.", "Address"].map((h) => (
                  <th key={h} className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {filteredStudents.map((student) => (
                <StudentRow key={student.id} student={student} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}