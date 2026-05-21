

import { useState } from "react";
import EditStudentModal from "../common/EditStudentModal";
import ConfirmModal from "../common/ConfirmModal";

export default function StudentRow({ student, onUpdate, onDelete }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const studentName = student.username || student.user?.name || "Unknown";
  const studentClass = student.class || student.class_name || "N/A";
  const rollNumber = student.roll_number || student.roll_no || "N/A";
  const admissionNo = student.admission_number || student.admission_no || "N/A";
  const address = student.address || student.address || "N/A";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await onDelete(student.id);
      if (success) {
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const success = await onUpdate(id, data);
      if (success) {
        setShowEditModal(false);
      }
      return success;
    } catch (error) {
      console.error("Update error:", error);
      return false;
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150 group">
        {/* Student Name */}
        <td className="px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {studentName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize block">
                {studentName}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ID: {student.user_id || student.user?.id || student.id || "N/A"}
              </span>
            </div>
          </div>
        </td>

        {/* Class */}
        <td className="px-4 sm:px-6 py-3.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
            {studentClass}
          </span>
        </td>

        {/* Roll No. */}
        <td className="px-4 sm:px-6 py-3.5">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
            {rollNumber}
          </span>
        </td>

        {/* Admission No. */}
        <td className="px-4 sm:px-6 py-3.5">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
            {admissionNo}
          </span>
        </td>

        {/* Address */}
        <td className="px-4 sm:px-6 py-3.5">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {address}
          </span>
        </td>

        {/* Actions */}
        <td className="px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors"
              title="Edit Student"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
              title="Delete Student"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {/* Edit Modal */}
      {showEditModal && (
        <EditStudentModal
          student={student}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <ConfirmModal
          title="Delete Student"
          message={`Are you sure you want to delete "${studentName}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={isDeleting}
        />
      )}
    </>
  );
}