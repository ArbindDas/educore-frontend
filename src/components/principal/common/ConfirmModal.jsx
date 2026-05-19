

import ModalPortal from "./ModalPortal";
import { XIcon } from "../icons/Icons";

export default function ConfirmModal({ title, message, onConfirm, onCancel, loading }) {
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
        <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-600" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 text-xl">
                ⚠️
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {message}
            </p>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold bg-white dark:bg-gray-800 hover:border-red-400 hover:text-red-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}