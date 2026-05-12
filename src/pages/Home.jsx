import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BarChart3,
  Users,
  BookOpen,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
  Star,
  ChevronRight,
  Zap,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react";

const stats = [
  { value: "50K+", label: "Students Enrolled" },
  { value: "2,000+", label: "Educators" },
  { value: "200+", label: "Institutions" },
  { value: "99.9%", label: "Uptime SLA" },
];

const features = [
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Real-time insights on attendance, performance, and school-wide KPIs in one view.",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/30",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    desc: "Admin, Principal, Teacher, and Student views — each tailored to their exact workflow.",
    color: "from-purple-500 to-indigo-500",
    bg: "bg-purple-50 dark:bg-purple-900/30",
  },
  {
    icon: CalendarCheck,
    title: "Smart Attendance",
    desc: "Mark, track, and report attendance digitally with automated alerts for absences.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-900/30",
  },
  {
    icon: BookOpen,
    title: "Library Management",
    desc: "Cataloging, borrowing, returns, and overdue tracking — fully digitized.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    desc: "Enterprise-grade security with role isolation, audit logs, and GDPR-ready infrastructure.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-900/30",
  },
  {
    icon: TrendingUp,
    title: "Performance Reports",
    desc: "Generate detailed academic reports per student, class, or institution in seconds.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/30",
  },
];

const testimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "Principal, Delhi Public School",
    text: "EduCore transformed how we manage our 3,000 students. The dashboard gives me a live pulse of the entire school.",
    initials: "PS",
    color: "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200",
  },
  {
    name: "Rajesh Kumar",
    role: "Head of IT, St. Xavier's College",
    text: "Setup took under a day. The role-based system means teachers only see what they need — no clutter, no confusion.",
    initials: "RK",
    color: "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200",
  },
  {
    name: "Anita Verma",
    role: "Academic Director, Greenfield Academy",
    text: "The attendance analytics alone saved us hours every week. EduCore feels like it was built specifically for us.",
    initials: "AV",
    color: "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200",
  },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("educore-theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-200/40 dark:bg-indigo-900/40 blur-3xl pointer-events-none" />
        <div className="absolute -top-16 right-0 w-80 h-80 rounded-full bg-blue-200/30 dark:bg-blue-900/30 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 mb-6">
            <Zap size={13} className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 tracking-wide uppercase">
              Education ERP · Built for Scale
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            The Operating System{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              for Modern Schools
            </span>
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            EduCore unifies student management, attendance, academics, library,
            and analytics into one clean SaaS platform — built for admins,
            teachers, and students alike.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all duration-200"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Sign In
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Hero dashboard mockup */}
        <div className="max-w-4xl mx-auto mt-16 px-4 relative z-10">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-5 max-w-xs text-xs flex items-center px-3 text-gray-400 dark:text-gray-500">
                app.educore.io/dashboard
              </div>
            </div>
            {/* Dashboard preview */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Students", val: "3,842", icon: "👨‍🎓", c: "indigo" },
                  { label: "Teachers", val: "142", icon: "👩‍🏫", c: "purple" },
                  { label: "Attendance", val: "94.2%", icon: "✅", c: "green" },
                  { label: "Classes", val: "86", icon: "📚", c: "blue" },
                ].map((k) => (
                  <div
                    key={k.label}
                    className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-xl mb-1">{k.icon}</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {k.val}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
              {/* Fake chart bar */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
                  Weekly Attendance Overview
                </div>
                <div className="flex items-end gap-2 h-16">
                  {[72, 85, 90, 88, 94, 91, 96].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-blue-400 opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (d) => (
                      <span
                        key={d}
                        className="flex-1 text-center text-[10px] text-gray-400 dark:text-gray-600"
                      >
                        {d}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 bg-gradient-to-r from-indigo-600 to-blue-500">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-sm text-indigo-100 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
              Platform Modules
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Everything your institution needs
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm max-w-xl mx-auto">
              A unified system replacing spreadsheets, paper registers, and
              disconnected tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4`}
                  >
                    <div
                      className={`bg-gradient-to-br ${f.color} w-8 h-8 rounded-md flex items-center justify-center`}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
              How It Works
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Up and running in minutes
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Globe,
                title: "Create Your Institution",
                desc: "Sign up and configure your school profile, departments, and academic year.",
              },
              {
                step: "02",
                icon: Users,
                title: "Invite Your Team",
                desc: "Add admins, teachers, and students. Roles are auto-assigned with the right permissions.",
              },
              {
                step: "03",
                icon: Clock,
                title: "Go Live",
                desc: "Start marking attendance, managing classes, and viewing analytics from day one.",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="text-xs font-mono font-bold text-indigo-400 dark:text-indigo-500 mb-2">
                    STEP {s.step}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
              Trusted By Educators
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Schools love EduCore
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${t.color}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl p-12 shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent)]" />
          <GraduationCap size={40} className="text-white/90 mx-auto mb-5" />
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Ready to modernize your school?
          </h2>
          <p className="text-indigo-100 text-sm mb-8 leading-relaxed">
            Join 200+ institutions already running on EduCore. No credit card
            required — free trial for 30 days.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-indigo-700 font-bold hover:bg-indigo-50 hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Start Free Trial
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
              <GraduationCap size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-sm">
              EduCore
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} EduCore ERP. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500">
            <Link to="/login" className="hover:text-indigo-500 transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-indigo-500 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}