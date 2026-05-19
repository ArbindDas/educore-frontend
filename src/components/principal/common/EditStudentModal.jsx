import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import InputField from "../common/InputField";
import { PrimaryBtn, SecondaryBtn } from "../common/PrimaryBtn";

export default function EditStudentModal({ student, onClose, onUpdate }) {
  const [form, setForm] = useState({
    roll_number: "",
    admission_number: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Populate form with student data when modal opens
  useEffect(() => {
    if (student) {
      setForm({
        roll_number: student.roll_number || student.roll_no || "",
        admission_number: student.admission_number || student.admission_no || "",
        address: student.address || "",
      });
    }
  }, [student]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const success = await onUpdate(student.id, form);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title={`Edit Student: ${student.name || student.user?.name || 'Student'}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Student:</span> {student.name || student.user?.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span className="font-semibold">Class:</span> {student.class || student.class_name || "N/A"}
          </p>
        </div>
        
        <InputField
          label="Roll Number"
          name="roll_number"
          value={form.roll_number}
          onChange={handleChange}
          type="text"
          placeholder="e.g. 101"
          required
        />
        
        <InputField
          label="Admission Number"
          name="admission_number"
          value={form.admission_number}
          onChange={handleChange}
          type="text"
          placeholder="e.g. ADM-2024-001"
          required
        />
        
        <InputField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Kathmandu, Nepal"
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <SecondaryBtn onClick={onClose}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Student"}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
}