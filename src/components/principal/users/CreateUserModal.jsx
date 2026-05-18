import { useState } from "react";
import Modal from "../common/Modal";
import InputField from "../common/InputField";
import {PrimaryBtn , SecondaryBtn} from "../common/PrimaryBtn"
import {ROLE_OPTIONS ,ROLE_COLORS ,  EMPTY_USER_FORM} from "../../../constant/principalConstants"

export default function CreateUserModal({ onClose, onSubmit }) {
  const [userForm, setUserForm] = useState(EMPTY_USER_FORM);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setUserForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await onSubmit(userForm);
    setSubmitting(false);
    if (success) {
      onClose();
      setUserForm(EMPTY_USER_FORM);
    }
  };

  return (
    <Modal title="Create New User" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {userForm.role && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ROLE_COLORS[userForm.role]} flex items-center justify-center text-white text-sm`}
            >
              {userForm.role === "teacher" ? "👨‍🏫" : userForm.role === "student" ? "🎓" : "📚"}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 capitalize">
                Creating: {userForm.role}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                A profile will be created automatically
              </p>
            </div>
          </div>
        )}

        <InputField
          label="Role"
          name="role"
          value={userForm.role}
          onChange={handleChange}
          options={ROLE_OPTIONS}
          required
        />
        <InputField
          label="Username"
          name="username"
          value={userForm.username}
          onChange={handleChange}
          placeholder="e.g. motilal"
          required
        />
        <InputField
          label="Email"
          name="email"
          value={userForm.email}
          onChange={handleChange}
          type="email"
          placeholder="e.g. motilal@gmail.com"
          required
        />
        <InputField
          label="Password"
          name="password"
          value={userForm.password}
          onChange={handleChange}
          type="password"
          placeholder="Min 8 characters"
          required
        />

        <div className="pt-1 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-700">
          ℹ️ Principal role cannot be created here — only one principal is allowed per system.
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <SecondaryBtn onClick={onClose}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Create User"}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
}