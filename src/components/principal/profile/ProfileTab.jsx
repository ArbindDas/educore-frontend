
import ProfileField from "./ProfileField";
import ContactStrip from "./ContactStrip";

import { SkeletonField } from "../common/SkeletonField";

export default function ProfileTab({ profile, loading }) {
  const initials = profile?.username
    ? profile.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "PR";

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-colors duration-300">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
        <div className="p-6 lg:p-8 flex flex-col gap-6">
          {/* Avatar + Name */}
          {loading ? (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-5 w-40 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-56 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="h-6 w-28 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse mt-1" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xl lg:text-2xl font-bold flex-shrink-0 ring-4 ring-indigo-100 dark:ring-indigo-900 shadow-sm">
                {initials}
              </div>
              <div className="flex flex-col min-w-0 text-center sm:text-left">
                <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.username}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500 font-mono mt-1">
                  {profile?.email}
                </span>
                <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Active Principal
                  </span>
                  {profile?.designation && (
                    <span className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-100 dark:border-purple-900">
                      {profile.designation}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Contact Strip */}
          {loading ? (
            <div className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ) : (
            <ContactStrip profile={profile} />
          )}

          {/* Administrative Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                Administrative Information
              </span>
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(4).fill().map((_, i) => <SkeletonField key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ProfileField label="Phone Number" value={profile?.phone_number} icon="📱" />
                <ProfileField label="Admin Level" value={profile?.admin_level} icon="🏛️" />
                <ProfileField label="Office Room" value={profile?.office_room} icon="🚪" />
                <ProfileField label="Designation" value={profile?.designation} icon="👔" />
              </div>
            )}
          </div>

          {/* Account Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 whitespace-nowrap">
                Account Information
              </span>
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => <SkeletonField key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProfileField label="Full Name" value={profile?.username} icon="👤" />
                <ProfileField label="Email Address" value={profile?.email} icon="✉️" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}