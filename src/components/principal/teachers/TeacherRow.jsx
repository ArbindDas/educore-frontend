

// TeacherRow.jsx - CORRECT VERSION
import { useState, useEffect } from "react";
import EditTeacherModal from "./EditTeacherModal";
import ConfirmModal from "../common/ConfirmModal";
// ❌ REMOVE THIS: import { useTeachers } from "../../../hooks/useTeacher";

export default function TeacherRow({ teacher, onUpdate, onDelete }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // ✅ REMOVE THIS: const { updateTeacher, deleteTeacher } = useTeachers();

  // Get username from teacher object
  const username = teacher.username || teacher.user?.username || "Unknown";
  const joinedDate = teacher.created_at || teacher.joined_date || new Date().toISOString();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // ✅ Use onDelete from props instead
      const success = await onDelete(teacher.id);
      
      if (success) {
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150 group">
        {/* Username */}
        <td className="px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {username.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize block">
                {username}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ID: {teacher.user_id || teacher.user?.id || teacher.id || "N/A"}
              </span>
            </div>
          </div>
        </td>

        {/* Phone */}
        <td className="px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {teacher.phone_number || "—"}
            </span>
          </div>
        </td>

        {/* Experience */}
        <td className="px-4 sm:px-6 py-3.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300">
            {teacher.experience || "—"}
          </span>
        </td>

        {/* Qualification */}
        <td className="px-4 sm:px-6 py-3.5">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {teacher.qualification || "—"}
          </span>
        </td>

        {/* Joined Date */}
        <td className="px-4 sm:px-6 py-3.5">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(joinedDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </td>

        {/* Actions */}
        <td className="px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors"
              title="Edit Teacher"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
              title="Delete Teacher"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {/* Edit Modal */}
      {showEditModal && (
        <EditTeacherModal
          teacher={teacher}
          onClose={() => setShowEditModal(false)}
          onUpdate={onUpdate} // ✅ Use onUpdate from props
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <ConfirmModal
          title="Delete Teacher"
          message={`Are you sure you want to delete "${username}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={isDeleting}
        />
      )}
    </>
  );
} 