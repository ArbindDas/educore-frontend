export const SkeletonField = () => (
  <div className="flex flex-col gap-1.5">
    <div className="h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    <div className="h-10 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
  </div>
);

export const SkeletonRow = () => (
  <tr className="border-b border-gray-50 dark:border-gray-800/50">
    {Array(5).fill().map((_, i) => (
      <td key={i} className="px-4 sm:px-6 py-3.5">
        <div className="h-5 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
      </td>
    ))}
  </tr>
);