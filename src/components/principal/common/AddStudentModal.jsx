

// src/components/common/AddStudentModal.jsx
import { useState } from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import { PrimaryBtn, SecondaryBtn } from "./PrimaryBtn";

export default function AddStudentModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    user_id: "",
    academic_class_id: "",
    roll_number: "",
    admission_number: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await onCreate(form);
    if (success) {
      onClose();
    }
    setSubmitting(false);
  };

  return (
    <Modal title="Add New Student" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="User ID"
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          type="text"
          placeholder="e.g. 1"
          required
        />

        <InputField
          label="Academic Class ID"
          name="academic_class_id"
          value={form.academic_class_id}
          onChange={handleChange}
          type="text"
          placeholder="e.g. 5"
          required
        />

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
          <SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>
          <PrimaryBtn type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Add Student"}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
}