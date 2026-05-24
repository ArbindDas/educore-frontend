

// components/principal/teacherAssignment/TeacherAssignmentTab.jsx
import { useState } from 'react';
import TeacherAssignmentForm from './TeacherAssignmentForm';
import TeacherAssignmentList from './TeacherAssignmentList';

export default function TeacherAssignmentTab({
  assignments,
  loading,
  teachers,
  academicClasses,
  onCreateAssignment,
}) {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data) => {
    const success = await onCreateAssignment(data);
    if (success) {
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Teacher Assignments
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Assign subjects and classes to teachers
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Assignment'}
        </button>
      </div>

      {showForm && (
        <TeacherAssignmentForm
          teachers={teachers}
          academicClasses={academicClasses}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <TeacherAssignmentList
        assignments={assignments}
        loading={loading}
      />
    </div>
  );
}