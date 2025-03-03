import React, { useEffect } from "react";

export default function Loader({ isLoading }: { isLoading: boolean }) {
  useEffect(() => {
    console.log("Loader state changed:", isLoading);
  }, [isLoading]); // Logs when `isLoading` changes

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-t-transparent"></div>
    </div>
  );
}
