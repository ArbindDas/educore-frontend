import { useState } from "react";
import Modal from "../common/Modal";
import InputField from "../common/InputField";
import { PrimaryBtn, SecondaryBtn } from "../common/PrimaryBtn";

const EMPTY_TEACHER_FORM = {
  user_id: "",
  phone_number: "",
  experience: "",
  qualification: "",
};

export default function CreateTeacherModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_TEACHER_FORM);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const success = await onSubmit(form);

    setSubmitting(false);

    if (success) {
      onClose();
      setForm(EMPTY_TEACHER_FORM);
    }
  };

  return (
    <Modal title="Add New Teacher" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[70vh] overflow-y-auto px-1"
      >
        <InputField
          label="User ID"
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          placeholder="e.g. 8"
          required
        />

        <InputField
          label="Phone Number"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          type="tel"
          placeholder="e.g. 98211621214"
          required
        />

        <InputField
          label="Experience"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="e.g. 4 years"
          required
        />

        <InputField
          label="Qualification"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
          placeholder="e.g. M.Sc. Mathematics, B.Ed"
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <SecondaryBtn onClick={onClose}>
            Cancel
          </SecondaryBtn>

          <PrimaryBtn type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Add Teacher"}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
}