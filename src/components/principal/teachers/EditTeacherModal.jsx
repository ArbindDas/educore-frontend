import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import InputField from "../common/InputField";
import { PrimaryBtn, SecondaryBtn } from "../common/PrimaryBtn";
import { EXPERIENCE_OPTIONS } from "../../../constant/principalConstants";



// EditTeacherModal
//     ↓
// TeacherRow (onUpdate)
//     ↓
// TeachersTable
//     ↓
// TeachersTab
//     ↓
// PrincipalDashboard
//     ↓
// useTeachers().updateTeacher()
//     ↓
// API call (Spring Boot)
//     ↓
// Database update
//     ↓
// state updated → UI re-renders

export default function EditTeacherModal({ teacher, onClose, onUpdate }) {
  const [form, setForm] = useState({
    phone_number: "",
    experience: "",
    qualification: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Populate form with teacher data when modal opens
  useEffect(() => {
    if (teacher) {
      setForm({
        phone_number: teacher.phone_number || "",
        experience: teacher.experience || "",
        qualification: teacher.qualification || "",
      });
    }
  }, [teacher]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await onUpdate(teacher.id, form);

    setSubmitting(false);

    if (result) {
      onClose();
    }
  };

  return (
    <Modal
      title={`Edit Teacher: ${teacher.username || teacher.user?.username || "Teacher"}`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">User:</span>{" "}
            {teacher.username || teacher.user?.username}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span className="font-semibold">User ID:</span>{" "}
            {teacher.user_id || teacher.user?.id}
          </p>
        </div>

        <InputField
          label="Phone Number"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          type="tel"
          placeholder="e.g. 9811122233"
          required
        />

        <InputField
          label="Experience"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          options={EXPERIENCE_OPTIONS}
          required
        />

        <InputField
          label="Qualification"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
          placeholder="e.g. MSc Physics, B.Ed"
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>
          <PrimaryBtn type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Teacher"}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
}
