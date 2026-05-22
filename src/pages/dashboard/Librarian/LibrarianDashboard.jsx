



import { useEffect, useState } from "react";
import {
  getAllBooks,
  AddBook,
  updateBookById,
  issueBook,
  returnedTheBook,
  LibrarianActiveIssuesView
} from "../../../services/librarian";

// ─── Reusable UI ──────────────────────────────────────────────────────────────

const Badge = ({ children, color = "blue" }) => {
  const map = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    yellow:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
    gray: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${map[color]}`}
    >
      {children}
    </span>
  );
};

const KpiCard = ({ label, value, icon, gradient, sub, onClick }) => (
  <div 
    onClick={onClick}
    className={`rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          {label}
        </p>
        <p
          className={`mt-1.5 text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {value}
        </p>
        {sub && (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{sub}</p>
        )}
      </div>
      <div
        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl shadow-sm`}
      >
        {icon}
      </div>
    </div>
  </div>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
    />
  </div>
);

const PrimaryBtn = ({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm font-semibold shadow-sm hover:shadow-indigo-200 dark:hover:shadow-indigo-900 hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const SecondaryBtn = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold bg-white dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

const DangerBtn = ({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

// ─── Modal Shell ──────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />
    <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>
    </div>
  </div>
);

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  const colors = {
    success:
      "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300",
    error:
      "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300",
    info: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300",
  };
  return (
    <div
      className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium ${colors[type]}`}
    >
      <span>{type === "success" ? "✓" : type === "error" ? "✗" : "ℹ"}</span>
      {message}
    </div>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const TableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="h-14 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"
      />
    ))}
  </div>
);

// ─── EMPTY BOOK FORM ──────────────────────────────────────────────────────────
const EMPTY_BOOK = {
  id: "",
  title: "",
  author: "",
  isbn: "",
  total_copies: "",
  available_copies: "",
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function LibrarianDashboard() {
  const [dark, setDark] = useState(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem("educore-theme") === "dark",
  );
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("books");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  // Modals
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [issueModal, setIssueModal] = useState(null);
  const [returnModal, setReturnModal] = useState(false);
  const [activeIssuesModal, setActiveIssuesModal] = useState(false);
  const [activeIssues, setActiveIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(false);

  // Form states
  const [addForm, setAddForm] = useState(EMPTY_BOOK);
  const [editForm, setEditForm] = useState(EMPTY_BOOK);
  const [issueForm, setIssueForm] = useState({ student_id: "", book_id: "" });
  const [returnForm, setReturnForm] = useState({ issue_id: "" });
  const [submitting, setSubmitting] = useState(false);

  // ── theme
  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
    localStorage.setItem("educore-theme", dark ? "dark" : "light");
  }, [dark]);

  // ── load books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks();
      setBooks(Array.isArray(data) ? data : (data.results ?? []));
    } catch {
      showToast("Failed to load books", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const showToast = (message, type = "success") => setToast({ message, type });

  // ── Fetch active issues
  const fetchActiveIssues = async () => {
    setLoadingIssues(true);
    try {
      const data = await LibrarianActiveIssuesView();
      setActiveIssues(data.active_issues || []);
      setActiveIssuesModal(true);
    } catch (error) {
      console.error("Failed to fetch active issues:", error);
      showToast("Failed to load active issues", "error");
    } finally {
      setLoadingIssues(false);
    }
  };

  // ── KPIs
  const totalBooks = books.length;
  const totalCopies = books.reduce((s, b) => s + (b.total_copies || 0), 0);
  const availableCopies = books.reduce(
    (s, b) => s + (b.available_copies || 0),
    0,
  );
  const issuedCopies = totalCopies - availableCopies;

  // ── Filtered books
  const filtered = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn?.toLowerCase().includes(search.toLowerCase()),
  );

  // ── Handlers
  const handleAddChange = (e) =>
    setAddForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleEditChange = (e) =>
    setEditForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await AddBook({
        title: addForm.title,
        author: addForm.author,
        isbn: addForm.isbn,
        total_copies: Number(addForm.total_copies),
        available_copies: Number(addForm.available_copies),
      });
      showToast("Book added successfully", "success");
      setAddModal(false);
      setAddForm(EMPTY_BOOK);
      fetchBooks();
    } catch {
      showToast("Failed to add book", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (book) => {
    setEditForm({
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      total_copies: book.total_copies,
      available_copies: book.available_copies,
      created_at: book.created_at,
    });
    setEditModal(book);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateBookById(editModal.id, {
        title: editForm.title,
        author: editForm.author,
        isbn: editForm.isbn,
        total_copies: Number(editForm.total_copies),
        available_copies: Number(editForm.available_copies),
        created_at: editForm.created_at,
      });
      showToast("Book updated successfully", "success");
      setEditModal(null);
      fetchBooks();
    } catch {
      showToast("Failed to update book", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const openIssueModal = (book) => {
    setIssueForm({ student_id: "", book_id: book.id });
    setIssueModal(book);
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await issueBook({
        student_id: Number(issueForm.student_id),
        book_id: Number(issueForm.book_id),
      });
      showToast("Book issued successfully", "success");
      setIssueModal(null);
      fetchBooks();
    } catch {
      showToast("Failed to issue book", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();

    const issueId = Number(returnForm.issue_id);

    if (!issueId || isNaN(issueId)) {
      showToast("Please enter a valid Issue ID", "error");
      return;
    }

    setSubmitting(true);

    try {
      await returnedTheBook(issueId);

      showToast("Book returned successfully", "success");
      setReturnModal(false);
      setReturnForm({ issue_id: "" });

      fetchBooks();
    } catch (error) {
      console.log(error?.response?.data);
      showToast("Failed to return book", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Availability badge
  const availBadge = (book) => {
    const ratio = book.available_copies / book.total_copies;
    if (book.available_copies === 0)
      return <Badge color="red">Out of Stock</Badge>;
    if (ratio < 0.3) return <Badge color="yellow">Low Stock</Badge>;
    return <Badge color="green">Available</Badge>;
  };

  // ── NAV ITEMS
  const navItems = [
    { id: "books", label: "Book Catalog", icon: BookIcon },
    { id: "issue", label: "Issue Book", icon: IssueIcon },
    { id: "return", label: "Return Book", icon: ReturnIcon },
  ];

  // ─── SIDEBAR (shared desktop + mobile) ──────────────────────────────────────
  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 pt-20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            EC
          </div>
          <div>
            <span className="font-bold text-sm text-gray-900 dark:text-white tracking-tight block">
              EduCore
            </span>
            <span className="text-[10px]  text-gray-400 dark:text-gray-500 font-medium">
              Library Module
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Role pill */}
      <div className="mx-6 mb-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold">
            LB
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
              Librarian
            </p>
            <p className="text-[10px] text-indigo-500 dark:text-indigo-400">
              Library Management
            </p>
          </div>
        </div>
      </div>

      {/* Section label */}
      <p className="px-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-2">
        Manage
      </p>

      {/* Nav */}
      <nav className="px-3 space-y-1 flex-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              if (id === "issue") {
                setIssueModal("manual");
                onClose?.();
                return;
              }
              if (id === "return") {
                setReturnModal(true);
                onClose?.();
                return;
              }
              setActiveTab(id);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === id && id === "books"
                ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* Theme toggle */}
      <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setDark((d) => !d)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
        >
          {dark ? (
            <>
              <SunIcon className="w-3.5 h-3.5" /> Light Mode
            </>
          ) : (
            <>
              <MoonIcon className="w-3.5 h-3.5" /> Dark Mode
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30">
        <SidebarContent />
      </aside>

      {/* ── MOBILE SIDEBAR ── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-2xl">
            <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── MAIN ── */}
      <main className="lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-all"
            >
              <HamburgerIcon className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Library Management
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                Manage books, issue & return records
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              className="hidden lg:flex p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 transition-all"
            >
              {dark ? (
                <SunIcon className="w-4 h-4" />
              ) : (
                <MoonIcon className="w-4 h-4" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                LB
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                Librarian
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              label="Total Titles"
              value={totalBooks}
              icon="📚"
              gradient="from-indigo-600 to-blue-500"
              sub="Unique books"
            />
            <KpiCard
              label="Total Copies"
              value={totalCopies}
              icon="📦"
              gradient="from-purple-600 to-indigo-500"
              sub="Across all titles"
            />
            <KpiCard
              label="Available"
              value={availableCopies}
              icon="✓"
              gradient="from-green-500 to-emerald-500"
              sub="Ready to issue"
            />
            <KpiCard
              label="Issued Out"
              value={issuedCopies}
              icon="↗"
              gradient="from-yellow-500 to-amber-500"
              sub="Currently borrowed"
              onClick={fetchActiveIssues}
            />
          </div>

          {/* Book Catalog */}
          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Book Catalog
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {filtered.length} of {books.length} titles
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search books…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40 sm:w-56 transition-all"
                  />
                  <svg
                    className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"
                    />
                  </svg>
                </div>
                <PrimaryBtn onClick={() => setAddModal(true)}>
                  <PlusIcon className="w-4  h-4" /> Add Book
                </PrimaryBtn>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-6">
                  <TableSkeleton />
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="text-5xl mb-3">📭</div>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    No books found
                  </p>
                </div>
              ) : (
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      {[
                        "ID",
                        "Title",
                        "Author",
                        "ISBN",
                        "Total",
                        "Available",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {filtered.map((book) => (
                      <tr
                        key={book.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                      >
                        <td className="px-4 sm:px-6 py-3.5">
                          <span className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300">
                            {book.id}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-base flex-shrink-0 shadow-sm">
                              📖
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[160px]">
                              {book.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3.5 text-sm text-gray-600 dark:text-gray-400">
                          {book.author}
                        </td>
                        <td className="px-4 sm:px-6 py-3.5 text-xs font-mono text-gray-500 dark:text-gray-400">
                          {book.isbn}
                        </td>
                        <td className="px-4 sm:px-6 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                          {book.total_copies}
                        </td>
                        <td className="px-4 sm:px-6 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                          {book.available_copies}
                        </td>
                        <td className="px-4 sm:px-6 py-3.5">
                          {availBadge(book)}
                        </td>
                        <td className="px-4 sm:px-6 py-3.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => openIssueModal(book)}
                              disabled={book.available_copies === 0}
                              className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                              Issue
                            </button>
                            <button
                              onClick={() => openEditModal(book)}
                              className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setIssueModal("manual")}
              className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-2xl shadow-sm">
                  ↗
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Issue a Book
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Assign a book to a student by ID
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => setReturnModal(true)}
              className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md cursor-pointer hover:border-green-300 dark:hover:border-green-700 transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-sm">
                  ↩
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Return a Book
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Process a return using the issue ID
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ══ MODALS ══════════════════════════════════════════════════════════════ */}

      {/* ACTIVE ISSUES MODAL */}
      {activeIssuesModal && (
        <Modal
          title="Currently Borrowed Books"
          onClose={() => {
            setActiveIssuesModal(false);
            setActiveIssues([]);
          }}
        >
          {loadingIssues ? (
            <div className="py-8">
              <TableSkeleton />
            </div>
          ) : activeIssues.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                No books currently issued
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Issue ID
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Student Name
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Student Email
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Book Title
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Author
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      ISBN
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Issue Date
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Issued By
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {activeIssues.map((issue) => (
                    <tr
                      key={issue.issue_id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300">
                          {issue.issue_id}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {issue.student_name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {issue.student_email}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-8 rounded bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xs">
                            📖
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {issue.book_title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {issue.book_author}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-500 dark:text-gray-400">
                        {issue.book_isbn}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(issue.issue_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {issue.issued_by}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      )}

      {/* ADD BOOK */}
      {addModal && (
        <Modal
          title="Add New Book"
          onClose={() => {
            setAddModal(false);
            setAddForm(EMPTY_BOOK);
          }}
        >
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <InputField
              label="Title"
              name="title"
              value={addForm.title}
              onChange={handleAddChange}
              placeholder="e.g. Javascript Programming"
              required
            />
            <InputField
              label="Author"
              name="author"
              value={addForm.author}
              onChange={handleAddChange}
              placeholder="e.g. Brendan Eich"
              required
            />
            <InputField
              label="ISBN"
              name="isbn"
              value={addForm.isbn}
              onChange={handleAddChange}
              placeholder="e.g. Javascript-007"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Total Copies"
                name="total_copies"
                value={addForm.total_copies}
                onChange={handleAddChange}
                type="number"
                placeholder="10"
                required
              />
              <InputField
                label="Available Copies"
                name="available_copies"
                value={addForm.available_copies}
                onChange={handleAddChange}
                type="number"
                placeholder="10"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryBtn
                onClick={() => {
                  setAddModal(false);
                  setAddForm(EMPTY_BOOK);
                }}
              >
                Cancel
              </SecondaryBtn>
              <PrimaryBtn type="submit" disabled={submitting}>
                {submitting ? "Adding…" : "Add Book"}
              </PrimaryBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* EDIT BOOK */}
      {editModal && (
        <Modal
          title={`Edit — ${editModal.title}`}
          onClose={() => setEditModal(null)}
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <InputField
              label="Title"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              placeholder="Book title"
              required
            />
            <InputField
              label="Author"
              name="author"
              value={editForm.author}
              onChange={handleEditChange}
              placeholder="Author name"
              required
            />
            <InputField
              label="ISBN"
              name="isbn"
              value={editForm.isbn}
              onChange={handleEditChange}
              placeholder="ISBN"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Total Copies"
                name="total_copies"
                value={editForm.total_copies}
                onChange={handleEditChange}
                type="number"
                required
              />
              <InputField
                label="Available Copies"
                name="available_copies"
                value={editForm.available_copies}
                onChange={handleEditChange}
                type="number"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryBtn onClick={() => setEditModal(null)}>
                Cancel
              </SecondaryBtn>
              <PrimaryBtn type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Save Changes"}
              </PrimaryBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* ISSUE BOOK */}
      {issueModal && (
        <Modal
          title={
            issueModal === "manual"
              ? "Issue a Book"
              : `Issue — ${issueModal.title}`
          }
          onClose={() => setIssueModal(null)}
        >
          <form onSubmit={handleIssueSubmit} className="space-y-4">
            {issueModal === "manual" && (
              <InputField
                label="Book ID"
                name="book_id"
                value={issueForm.book_id}
                onChange={(e) =>
                  setIssueForm((f) => ({ ...f, book_id: e.target.value }))
                }
                type="number"
                placeholder="Enter book ID"
                required
              />
            )}
            {issueModal !== "manual" && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900">
                <div className="text-2xl">📖</div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {issueModal.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    by {issueModal.author} · {issueModal.available_copies}{" "}
                    copies left
                  </p>
                </div>
              </div>
            )}
            <InputField
              label="Student ID"
              name="student_id"
              value={issueForm.student_id}
              onChange={(e) =>
                setIssueForm((f) => ({ ...f, student_id: e.target.value }))
              }
              type="number"
              placeholder="Enter student ID"
              required
            />
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryBtn onClick={() => setIssueModal(null)}>
                Cancel
              </SecondaryBtn>
              <PrimaryBtn type="submit" disabled={submitting}>
                {submitting ? "Issuing…" : "Issue Book"}
              </PrimaryBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* RETURN BOOK */}
      {returnModal && (
        <Modal
          title="Return a Book"
          onClose={() => {
            setReturnModal(false);
            setReturnForm({ issue_id: "" });
          }}
        >
          <form onSubmit={handleReturnSubmit} className="space-y-4">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm text-green-700 dark:text-green-400">
              Enter the Issue ID from the original lending record to process
              this return.
            </div>
            <InputField
              label="Issue ID"
              name="issue_id"
              value={returnForm.issue_id}
              onChange={(e) =>
                setReturnForm((prev) => ({
                  ...prev,
                  issue_id: e.target.value,
                }))
              }
              type="number"
              placeholder="Enter issue ID"
              required
            />
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryBtn
                onClick={() => {
                  setReturnModal(false);
                  setReturnForm({ issue_id: "" });
                }}
              >
                Cancel
              </SecondaryBtn>
              <PrimaryBtn type="submit" disabled={submitting}>
                {submitting ? "Processing…" : "Confirm Return"}
              </PrimaryBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}

// ─── SVG Icon Components ──────────────────────────────────────────────────────
const BookIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />
  </svg>
);

const IssueIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    />
  </svg>
);

const ReturnIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
    />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m14.95 5.66-.7-.7M6.41 6.41l-.7-.7m12.02 0-.7.7M6.41 17.59l-.7.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z"
    />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
    />
  </svg>
);

const HamburgerIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);