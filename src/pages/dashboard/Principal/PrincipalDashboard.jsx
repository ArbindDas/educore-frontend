

// import { useEffect, useState } from "react";
// import { getMyPrincipalProfile } from "../../../services/principalService";

// const ProfileField = ({ label, value, icon }) => (
//   <div className="flex flex-col gap-1.5">
//     <label className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
//       <span className="text-sm leading-none">{icon}</span>
//       {label}
//     </label>
//     <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 min-h-[40px] flex items-center transition-colors duration-200 hover:border-indigo-300 dark:hover:border-indigo-700">
//       {value || <span className="text-gray-400 dark:text-gray-600 italic font-normal">—</span>}
//     </div>
//   </div>
// );

// const SkeletonField = () => (
//   <div className="flex flex-col gap-1.5">
//     <div className="h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
//     <div className="h-10 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
//   </div>
// );

// export default function PrincipalDashboard() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dark, setDark] = useState(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("educore-theme") === "dark";
//     }
//     return false;
//   });

//   useEffect(() => {
//     const html = document.documentElement;
//     dark ? html.classList.add("dark") : html.classList.remove("dark");
//     localStorage.setItem("educore-theme", dark ? "dark" : "light");
//   }, [dark]);

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const data = await getMyPrincipalProfile();
//         setProfile(data);
//       } catch (error) {
//         console.error("Failed to load profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProfile();
//   }, []);

//   const initials = profile?.username
//     ? profile.username.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
//     : "??";

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

//       {/* ── TOPBAR ── */}
//       <header className="sticky top-0 z-50 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 transition-colors duration-300 shadow-sm">
//         <div className="flex items-center gap-2.5">
//           <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
//             EC
//           </div>
//           <span className="font-bold text-sm text-gray-900 dark:text-white tracking-tight">EduCore</span>
//           <span className="hidden sm:block h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
//           <span className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 font-medium">Student Portal</span>
//         </div>

//         <button
//           onClick={() => setDark((d) => !d)}
//           className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
//         >
//           {dark ? (
//             <>
//               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m14.95 5.66-.7-.7M6.41 6.41l-.7-.7m12.02 0-.7.7M6.41 17.59l-.7.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
//               </svg>
//               Light
//             </>
//           ) : (
//             <>
//               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
//               </svg>
//               Dark
//             </>
//           )}
//         </button>
//       </header>

//       {/* ── MAIN CONTENT ── */}
//       <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

//         {/* Page Header */}
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Principal Dashboard</h1>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             Welcome — manage your workflow, attendance, and profile here.
//           </p>
//         </div>

//         {/* ── PROFILE CARD ── */}
//         <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-colors duration-300">

//           {/* Gradient top accent */}
//           <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />

//           <div className="p-6 flex flex-col gap-6">

//             {/* ── AVATAR + NAME HERO ── */}
//             {loading ? (
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />
//                 <div className="flex flex-col gap-2 flex-1">
//                   <div className="h-4 w-36 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
//                   <div className="h-3 w-48 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
//                   <div className="h-5 w-24 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse mt-1" />
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0 ring-2 ring-indigo-100 dark:ring-indigo-900 shadow-sm">
//                   {initials}
//                 </div>
//                 <div className="flex flex-col min-w-0">
//                   <span className="text-base font-bold text-gray-900 dark:text-white truncate">{profile?.username}</span>
//                   <span className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5 truncate">{profile?.email}</span>
//                   <span className="mt-1.5 inline-flex items-center gap-1.5 self-start bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900">
//                     <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
//                     Active Teacher
//                   </span>
//                 </div>
//               </div>
//             )}

//             <div className="border-t border-gray-100 dark:border-gray-800" />

//             {/* ── ADMISSION STRIP ── */}
//             {loading ? (
//               <div className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
//             ) : (
//               <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-4">
//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">phone_number
// </p>
//                   <p className="text-base font-bold text-white font-mono tracking-wide mt-0.5">{profile?.phone_number
// }</p>
//                 </div>
//                 <svg className="w-8 h-8 text-white opacity-25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
//                 </svg>
//               </div>
//             )}

//             {/* ── ACADEMIC INFO ── */}
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
//                   Academic Info
//                 </span>
//                 <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
//               </div>
//               {loading ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {[...Array(4)].map((_, i) => <SkeletonField key={i} />)}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <ProfileField label="phone_number" value={profile?.phone_number} icon="🎓" />
//                   <ProfileField label="admin_level" value={profile?.admin_level} icon="🏷️" />
//                   <ProfileField label="office_room" value={profile?.office_room} icon="🔢" />
//                   <ProfileField label="designation" value={profile?.designation} icon="📍" />
//                 </div>
//               )}
//             </div>
              
//             {/* ── ACCOUNT INFO ── */}
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
//                   Account Info
//                 </span>
//                 <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
//               </div>
//               {loading ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {[...Array(2)].map((_, i) => <SkeletonField key={i} />)}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <ProfileField label="Full Name" value={profile?.username} icon="👤" />
//                   <ProfileField label="Email" value={profile?.email} icon="✉️" />
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { getMyPrincipalProfile } from "../../../services/principalService";

const ProfileField = ({ label, value, icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
      <span className="text-sm leading-none">{icon}</span>
      {label}
    </label>
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 min-h-[40px] flex items-center transition-colors duration-200 hover:border-indigo-300 dark:hover:border-indigo-700">
      {value || <span className="text-gray-400 dark:text-gray-600 italic font-normal">—</span>}
    </div>
  </div>
);

const SkeletonField = () => (
  <div className="flex flex-col gap-1.5">
    <div className="h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    <div className="h-10 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
  </div>
);

export default function PrincipalDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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
        const data = await getMyPrincipalProfile();
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-50 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-300 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            EC
          </div>
          <span className="font-bold text-sm text-gray-900 dark:text-white tracking-tight">EduCore</span>
          <span className="hidden sm:block h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
          <span className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 font-medium">Principal Portal</span>
        </div>

        <button
          onClick={() => setDark((d) => !d)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
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

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Principal Dashboard
              </h1>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">
                Welcome back, {profile?.username || 'Principal'} — manage your institution from here.
              </p>
            </div>
            
            {/* Quick Stats Badge */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 rounded-lg border border-indigo-100 dark:border-indigo-900">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  Admin Level: {profile?.admin_level || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* ── PROFILE CARD ── */}
          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-colors duration-300">

            {/* Gradient top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />

            <div className="p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">

              {/* ── AVATAR + NAME HERO ── */}
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
                        Active Principal
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs lg:text-sm font-semibold px-3 py-1 rounded-full border border-purple-100 dark:border-purple-900">
                        {profile?.designation || 'Principal'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-100 dark:border-gray-800" />

              {/* ── CONTACT STRIP ── */}
              {loading ? (
                <div className="h-20 lg:h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ) : (
                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 lg:px-6 py-4 lg:py-5">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-indigo-200">
                      Contact Number
                    </p>
                    <p className="text-base lg:text-xl font-bold text-white font-mono tracking-wide mt-1 truncate">
                      {profile?.phone_number || 'Not provided'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {profile?.office_room && (
                      <div className="hidden sm:block text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                          Office Room
                        </p>
                        <p className="text-sm font-bold text-white mt-1">
                          {profile?.office_room}
                        </p>
                      </div>
                    )}
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white opacity-25 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </div>
                </div>
              )}

              {/* ── ADMINISTRATIVE INFO ── */}
              <div>
                <div className="flex items-center gap-3 mb-4 lg:mb-5">
                  <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                    Administrative Information
                  </span>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                </div>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {[...Array(4)].map((_, i) => <SkeletonField key={i} />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    <ProfileField label="Phone Number" value={profile?.phone_number} icon="📱" />
                    <ProfileField label="Admin Level" value={profile?.admin_level} icon="🏛️" />
                    <ProfileField label="Office Room" value={profile?.office_room} icon="🚪" />
                    <ProfileField label="Designation" value={profile?.designation} icon="👔" />
                  </div>
                )}
              </div>
                
              {/* ── ACCOUNT INFO ── */}
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

              {/* Additional Stats Section */}
              {!loading && profile && (
                <div className="mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {new Date().getFullYear()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current Year</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {profile?.admin_level || 'N/A'} 
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Access Level</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {profile?.designation ? '✓' : '—'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Designation Set</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {profile?.phone_number ? '✓' : '—'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Contact Verified</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}