

// components/principal/teacherAssignment/TeacherAssignmentForm.jsx
import { useState, useEffect } from 'react';

export default function TeacherAssignmentForm({
  teachers,
  academicClasses,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    teacher_id: '',
    academic_class_id: '',
    subject: '',
  });

  // Debug: Log what we're getting
  useEffect(() => {
    if (teachers && teachers.length > 0) {
      console.log('Teachers with user_id:', teachers.map(t => ({
        profile_id: t.id,
        user_id: t.user_id,
        username: t.username
      })));
    }
  }, [teachers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.teacher_id || !formData.academic_class_id || !formData.subject) {
      alert('Please fill in all fields');
      return;
    }

    // Find the selected teacher by profile ID
    const selectedTeacher = teachers?.find(t => t.id === parseInt(formData.teacher_id));
    
    if (!selectedTeacher) {
      console.error('Teacher not found for ID:', formData.teacher_id);
      alert('Teacher not found. Please select a teacher from the dropdown.');
      return;
    }

    // Use the user_id from the teacher object
    const teacherUserId = selectedTeacher.user_id;
    
    if (!teacherUserId) {
      console.error('Teacher has no user_id:', selectedTeacher);
      alert('Selected teacher has no user_id. Please contact support.');
      return;
    }

    const submissionData = {
      teacher_id: Number(teacherUserId),  // This will be 53 for profile ID 20
      academic_class_id: Number(formData.academic_class_id),
      subject: formData.subject.trim(),
    };
    
    console.log('Submitting data:', submissionData);
    onSubmit(submissionData);

    // Reset form after submit
    setFormData({
      teacher_id: '',
      academic_class_id: '',
      subject: '',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        New Teacher Assignment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Teacher */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Teacher *
          </label>
          <select
            value={formData.teacher_id}
            onChange={(e) => {
              const selectedValue = e.target.value;
              console.log('Selected profile ID:', selectedValue);
              setFormData({ ...formData, teacher_id: selectedValue });
            }}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select Teacher</option>
            {teachers?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.username} (User ID: {teacher.user_id})
              </option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Academic Class *
          </label>
          <select
            value={formData.academic_class_id}
            onChange={(e) => setFormData({ ...formData, academic_class_id: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select Class</option>
            {academicClasses?.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name || `Class ${classItem.class_number || classItem.id}`}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., Mathematics, Physics, English"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg"
          >
            Assign Teacher
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}