

import { useEffect, useState } from "react";
import { getMyTeacherProfile } from "../../../services/teacherService";
import {
  markAttendance,
  checkAttendanceSummary,
  specificStudentAttendance,
} from "../../../services/attendanceService";

// ─────────────────────────────────────────────
// Reusable profile display components
// ─────────────────────────────────────────────
const ProfileField = ({ label, value, icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
      <span className="text-sm leading-none">{icon}</span>
      {label}
    </label>
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100 min-h-[40px] lg:min-h-[48px] flex items-center transition-colors duration-200 hover:border-indigo-300 dark:hover:border-indigo-700">
      {value || <span className="text-gray-400 dark:text-gray-600 italic font-normal">—</span>}
    </div>
  </div>
);

const SkeletonField = () => (
  <div className="flex flex-col gap-1.5">
    <div className="h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    <div className="h-10 lg:h-12 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
  </div>
);

// ─────────────────────────────────────────────
// Sidebar nav items config
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  {
    id: "markAttendance",
    label: "Mark Attendance",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "attendanceSummary",
    label: "Attendance Summary",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: "studentAttendance",
    label: "Student Attendance",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────
// Mark Attendance Panel
// ─────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { value: "P", label: "present", display: "✓ Present", color: "green" },
  { value: "A", label: "absent", display: "✗ Absent", color: "red" },
  { value: "L", label: "late", display: "~ Late", color: "yellow" }
];

const MarkAttendancePanel = () => {
  const [form, setForm] = useState({
    student_id: "",
    date: new Date().toISOString().split("T")[0],
    status: "P",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.student_id || !form.date || !form.status) return;

    setSubmitting(true);
    setResult(null);
    try {
      const payload = {
        student_id: Number(form.student_id),
        date: form.date,
        status: form.status,
      };
      await markAttendance(payload);
      setResult({ success: true, message: "Attendance marked successfully." });
      setForm((prev) => ({ ...prev, student_id: "" }));
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.student_id?.[0] ||
        "Failed to mark attendance. Please try again.";
      setResult({ success: false, message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusButtonClass = (statusValue, isActive) => {
    if (!isActive) {
      return "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-700";
    }
    
    switch(statusValue) {
      case "P":
        return "bg-green-500 border-green-500 text-white shadow-sm";
      case "A":
        return "bg-red-500 border-red-500 text-white shadow-sm";
      case "L":
        return "bg-yellow-400 border-yellow-400 text-white shadow-sm";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Mark Attendance</h2>
        <p className="text-sm lg:text-base text-gray-400 dark:text-gray-500 mt-1">
          Enter student ID, date, and status to record attendance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
        <div className="p-6 lg:p-8 flex flex-col gap-5 lg:gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
              <span>🎓</span> Student ID
            </label>
            <input
              type="number"
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              placeholder="e.g. 42"
              required
              min={1}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-3.5 py-2.5 lg:py-3 text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
              <span>📅</span> Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-3.5 py-2.5 lg:py-3 text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
              <span>📋</span> Status
            </label>
            <div className="flex gap-2 lg:gap-3">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setForm((p) => ({ ...p, status: opt.value })); setResult(null); }}
                  className={`flex-1 py-2.5 lg:py-3 rounded-lg text-xs lg:text-sm font-semibold border capitalize transition-all duration-200
                    ${getStatusButtonClass(opt.value, form.status === opt.value)}`}
                >
                  {opt.display}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div className={`rounded-lg px-4 py-3 text-sm lg:text-base font-medium flex items-center gap-2 ${
              result.success
                ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
            }`}>
              <span>{result.success ? "✓" : "✗"}</span>
              {result.message}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !form.student_id}
            className="w-full py-2.5 lg:py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm lg:text-base font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting…
              </>
            ) : (
              "Mark Attendance"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────
// Attendance Summary Panel
// ─────────────────────────────────────────────
const STATUS_MAP = {
  P: { label: "Present", icon: "✓", cls: "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800" },
  A: { label: "Absent",  icon: "✗", cls: "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800" },
  L: { label: "Late",    icon: "~", cls: "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800" },
};

const RecordBadge = ({ status }) => {
  const s = STATUS_MAP[status] ?? { label: status, icon: "?", cls: "bg-gray-50 dark:bg-gray-900 text-gray-500 border-gray-200 dark:border-gray-700" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] lg:text-xs font-semibold border ${s.cls}`}>
      {s.icon} {s.label}
    </span>
  );
};

const InputField = ({ label, icon, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
      <span>{icon}</span> {label}
    </label>
    <input
      {...props}
      className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-3.5 py-2.5 lg:py-3 text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full"
    />
  </div>
);

const FeedbackBanner = ({ result }) =>
  result ? (
    <div className={`rounded-lg px-4 py-3 text-sm lg:text-base font-medium flex items-center gap-2 ${
      result.success
        ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
        : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
    }`}>
      <span>{result.success ? "✓" : "✗"}</span>
      {result.message}
    </div>
  ) : null;

const SubmitButton = ({ loading, label, loadingLabel, disabled }) => (
  <button
    type="submit"
    disabled={loading || disabled}
    className="w-full py-2.5 lg:py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm lg:text-base font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    {loading ? (
      <>
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        {loadingLabel}
      </>
    ) : label}
  </button>
);

const AttendanceSummaryPanel = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!date) return;
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const result = await checkAttendanceSummary(date);
      setData(result);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        "Failed to load summary. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const total = data ? (data.present ?? 0) + (data.absent ?? 0) + (data.late ?? 0) : 0;
  const pct = total > 0 ? Math.round(((data?.present ?? 0) / total) * 100) : 0;
  const records = data?.records ?? [];

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Attendance Summary</h2>
        <p className="text-sm lg:text-base text-gray-400 dark:text-gray-500 mt-1">
          Pick a date to see the full class attendance for that day.
        </p>
      </div>

      <form onSubmit={handleFetch}>
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
          <div className="p-6 lg:p-8 flex flex-col gap-5 lg:gap-6">
            <InputField
              label="Select Date"
              icon="📅"
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setData(null); setError(null); }}
              required
            />
            {error && <FeedbackBanner result={{ success: false, message: error }} />}
            <SubmitButton loading={loading} label="Load Summary" loadingLabel="Loading…" disabled={!date} />
          </div>
        </div>
      </form>

      {data && (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 lg:px-6 py-4 lg:py-5 shadow-sm">
            <div className="text-center sm:text-left">
              <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-indigo-200">Date</p>
              <p className="text-base lg:text-xl font-bold text-white font-mono mt-0.5">{data.date ?? date}</p>
              {data.teacher && (
                <p className="text-xs lg:text-sm text-indigo-200 mt-1">Marked by: {data.teacher}</p>
              )}
            </div>
            <div className="text-center sm:text-right">
              <p className="text-3xl lg:text-4xl font-bold text-white">{pct}%</p>
              <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-indigo-200">Attendance Rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
            {[
              { label: "Total",   value: total,              color: "from-indigo-600 to-blue-500" },
              { label: "Present", value: data.present ?? 0,  color: "from-green-500 to-emerald-400" },
              { label: "Absent",  value: data.absent  ?? 0,  color: "from-red-500 to-rose-400" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl bg-gradient-to-br ${s.color} p-4 lg:p-5 flex flex-col gap-1 shadow-sm`}>
                <span className="text-2xl lg:text-3xl font-bold text-white">{s.value}</span>
                <span className="text-[11px] lg:text-xs font-semibold uppercase tracking-widest text-white opacity-80 leading-tight">{s.label}</span>
              </div>
            ))}
          </div>

          {records.length > 0 ? (
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
              <div className="px-5 lg:px-6 py-3 lg:py-4 border-b border-gray-100 dark:border-gray-800">
                <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                  Student Records
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm lg:text-base">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left px-5 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">ID</th>
                      <th className="text-left px-5 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">Student</th>
                      <th className="text-left px-5 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {records.map((row, i) => (
                      <tr key={row.student_id ?? i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                        <td className="px-5 lg:px-6 py-3 lg:py-4 font-mono text-xs lg:text-sm text-gray-400 dark:text-gray-600">{row.student_id}</td>
                        <td className="px-5 lg:px-6 py-3 lg:py-4 font-medium text-gray-800 dark:text-gray-200 capitalize">{row.student_name}</td>
                        <td className="px-5 lg:px-6 py-3 lg:py-4"><RecordBadge status={row.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-8 lg:p-12 flex flex-col items-center gap-3 text-center">
              <span className="text-4xl lg:text-5xl">📭</span>
              <p className="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400">No attendance records found for this date.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Student Attendance Panel
// ─────────────────────────────────────────────
const StudentAttendancePanel = () => {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!studentId) return;
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const result = await specificStudentAttendance(Number(studentId));
      setData(result);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Student not found or no records available."
      );
    } finally {
      setLoading(false);
    }
  };

  const studentName = typeof data?.student === "string" ? data.student : data?.student?.username ?? `Student #${studentId}`;
  const total = data ? (data.present ?? 0) + (data.absent ?? 0) + (data.late ?? 0) : 0;
  const pct = data?.attendance_percentage ?? (total > 0 ? Math.round(((data?.present ?? 0) / total) * 100) : 0);

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Student Attendance</h2>
        <p className="text-sm lg:text-base text-gray-400 dark:text-gray-500 mt-1">
          Enter a student ID to view their attendance summary.
        </p>
      </div>

      <form onSubmit={handleFetch}>
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
          <div className="p-6 lg:p-8 flex flex-col gap-5 lg:gap-6">
            <InputField
              label="Student ID"
              icon="🎓"
              type="number"
              min={1}
              placeholder="e.g. 6"
              value={studentId}
              onChange={(e) => { setStudentId(e.target.value); setData(null); setError(null); }}
              required
            />
            {error && <FeedbackBanner result={{ success: false, message: error }} />}
            <SubmitButton loading={loading} label="View Summary" loadingLabel="Fetching…" disabled={!studentId} />
          </div>
        </div>
      </form>

      {data && (
        <>
          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 lg:px-6 py-4 lg:py-5 shadow-sm">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-base lg:text-xl flex-shrink-0 ring-2 ring-white/30">
              {studentName[0]?.toUpperCase() ?? "S"}
            </div>
            <div className="flex flex-col min-w-0 text-center sm:text-left">
              <span className="text-base lg:text-lg font-bold text-white capitalize truncate">{studentName}</span>
              <span className="text-xs lg:text-sm text-indigo-200 font-mono">ID: {studentId}</span>
            </div>
            <div className="ml-auto text-center sm:text-right flex-shrink-0">
              <p className="text-3xl lg:text-4xl font-bold text-white">{Number(pct).toFixed(1)}%</p>
              <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-indigo-200">Attendance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
            {[
              { label: "Total Sessions", value: total, color: "from-indigo-600 to-blue-500" },
              { label: "Present", value: data.present ?? 0, color: "from-green-500 to-emerald-400" },
              { label: "Absent", value: data.absent ?? 0, color: "from-red-500 to-rose-400" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl bg-gradient-to-br ${s.color} p-4 lg:p-5 flex flex-col gap-1 shadow-sm`}>
                <span className="text-2xl lg:text-3xl font-bold text-white">{s.value}</span>
                <span className="text-[11px] lg:text-xs font-semibold uppercase tracking-widest text-white opacity-80 leading-tight">{s.label}</span>
              </div>
            ))}
          </div>

          {data.late !== undefined && (
            <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-amber-400 p-4 lg:p-5 flex items-center justify-between shadow-sm">
              <span className="text-[11px] lg:text-xs font-semibold uppercase tracking-widest text-white opacity-80">Late</span>
              <span className="text-2xl lg:text-3xl font-bold text-white">{data.late}</span>
            </div>
          )}

          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
            <div className="p-5 lg:p-6 flex flex-col gap-3 lg:gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">Attendance Rate</span>
                <span className="text-sm lg:text-base font-bold text-gray-800 dark:text-gray-100">{Number(pct).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 lg:h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    pct >= 75
                      ? "bg-gradient-to-r from-green-500 to-emerald-400"
                      : pct >= 50
                      ? "bg-gradient-to-r from-yellow-400 to-amber-400"
                      : "bg-gradient-to-r from-red-500 to-rose-400"
                  }`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <p className="text-xs lg:text-sm text-gray-400 dark:text-gray-600">
                {pct >= 75 ? "✓ Good standing" : pct >= 50 ? "⚠ Below recommended (75%)" : "✗ Critical — attendance too low"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Panel router
// ─────────────────────────────────────────────
const PANELS = {
  markAttendance: <MarkAttendancePanel />,
  attendanceSummary: <AttendanceSummaryPanel />,
  studentAttendance: <StudentAttendancePanel />,
};

// ─────────────────────────────────────────────
// Main Dashboard
// ─────────────────────────────────────────────
export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState({
    studend_id: "",
    date: "",
    status: "",
  });
  const [activePanel, setActivePanel] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("educore-theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
    localStorage.setItem("educore-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyTeacherProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const initials = profile?.username
    ? profile.username.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const handleNavClick = (id) => {
    setActivePanel((prev) => (prev === id ? null : id));
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col">

      <header className="sticky top-0 z-50 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-300 shadow-sm">
        <div className="flex items-center gap-2.5">
          <button
            className="mr-1 lg:hidden p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            EC
          </div>
          <span className="font-bold text-sm lg:text-base text-gray-900 dark:text-white tracking-tight">EduCore</span>
          <span className="hidden sm:block h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
          <span className="hidden sm:block text-xs lg:text-sm text-gray-400 dark:text-gray-500 font-medium">Teacher Portal</span>
        </div>

        <button
          onClick={() => setDark((d) => !d)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
        >
          {dark ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m14.95 5.66-.7-.7M6.41 6.41l-.7-.7m12.02 0-.7.7M6.41 17.59l-.7.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
              </svg>
              Light
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
              Dark
            </>
          )}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            fixed lg:sticky top-14 z-40 lg:z-auto h-[calc(100vh-3.5rem)]
            w-64 flex-shrink-0
            bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
            flex flex-col py-4 lg:py-6 gap-1
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <p className="px-4 lg:px-6 mb-2 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">
            Tools
          </p>

          {NAV_ITEMS.map((item) => {
            const isActive = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  mx-2 lg:mx-3 flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium
                  transition-all duration-200 text-left
                  ${isActive
                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                  }
                `}
              >
                <span className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-600"}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </button>
            );
          })}

          {activePanel && (
            <>
              <div className="mx-4 lg:mx-6 my-2 h-px bg-gray-100 dark:bg-gray-800" />
              <button
                onClick={() => setActivePanel(null)}
                className="mx-2 lg:mx-3 flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                My Profile
              </button>
            </>
          )}
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="flex flex-col gap-6 lg:gap-8">
              {activePanel ? (
                PANELS[activePanel]
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Teacher Dashboard
                      </h1>
                      <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">
                        Welcome back, {profile?.username || 'Teacher'} — manage your classes and attendance here.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 rounded-lg border border-indigo-100 dark:border-indigo-900">
                        <span className="text-xs lg:text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          Experience: {profile?.experience || 'N/A'} years
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {NAV_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActivePanel(item.id)}
                        className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shadow-sm"
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-colors duration-300">
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
                    <div className="p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
                      {loading ? (
                        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />
                          <div className="flex flex-col gap-2 flex-1 text-center sm:text-left">
                            <div className="h-5 w-40 lg:w-48 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto sm:mx-0" />
                            <div className="h-4 w-56 lg:w-64 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse mx-auto sm:mx-0" />
                            <div className="h-6 w-28 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse mt-1 mx-auto sm:mx-0" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xl lg:text-2xl font-bold flex-shrink-0 ring-4 ring-indigo-100 dark:ring-indigo-900 shadow-sm">
                            {initials}
                          </div>
                          <div className="flex flex-col min-w-0 text-center sm:text-left">
                            <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                              {profile?.username}
                            </span>
                            <span className="text-sm lg:text-base text-gray-400 dark:text-gray-500 font-mono mt-1 truncate">
                              {profile?.email}
                            </span>
                            <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                              <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs lg:text-sm font-semibold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Active Teacher
                              </span>
                              {profile?.qualification && (
                                <span className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs lg:text-sm font-semibold px-3 py-1 rounded-full border border-purple-100 dark:border-purple-900">
                                  {profile.qualification}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gray-100 dark:border-gray-800" />

                      {loading ? (
                        <div className="h-20 lg:h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 lg:px-6 py-4 lg:py-5">
                          <div className="text-center sm:text-left">
                            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-indigo-200">Contact Number</p>
                            <p className="text-base lg:text-xl font-bold text-white font-mono tracking-wide mt-1">
                              {profile?.phone_number || 'Not provided'}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {profile?.experience && (
                              <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Experience</p>
                                <p className="text-sm lg:text-base font-bold text-white mt-1">
                                  {profile.experience} years
                                </p>
                              </div>
                            )}
                            <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white opacity-25 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                            </svg>
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-3 mb-4 lg:mb-5">
                          <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                            Professional Information
                          </span>
                          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                        </div>
                        {loading ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            {[...Array(3)].map((_, i) => <SkeletonField key={i} />)}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            <ProfileField label="Phone Number" value={profile?.phone_number} icon="📱" />
                            <ProfileField label="Experience" value={profile?.experience ? `${profile.experience} years` : null} icon="⭐" />
                            <ProfileField label="Qualification" value={profile?.qualification} icon="🎓" />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-4 lg:mb-5">
                          <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                            Account Information
                          </span>
                          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                        </div>
                        {loading ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {[...Array(2)].map((_, i) => <SkeletonField key={i} />)}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            <ProfileField label="Full Name" value={profile?.username} icon="👤" />
                            <ProfileField label="Email Address" value={profile?.email} icon="✉️" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}