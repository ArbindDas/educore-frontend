export default function ContactStrip({ profile }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-4">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
          Contact Number
        </p>
        <p className="text-base lg:text-xl font-bold text-white font-mono tracking-wide mt-1 truncate">
          {profile?.phone_number || "Not provided"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {profile?.office_room && (
          <div className="hidden sm:block text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
              Office Room
            </p>
            <p className="text-sm font-bold text-white mt-1">
              {profile.office_room}
            </p>
          </div>
        )}
        <svg
          className="w-8 h-8 text-white opacity-25 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z"
          />
        </svg>
      </div>
    </div>
  );
}