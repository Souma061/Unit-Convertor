export default function Loading({ fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-t-blue-400 dark:border-b-blue-400"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}


