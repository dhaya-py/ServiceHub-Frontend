import React from "react";

export default function NavBar() {
  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="text-xl font-semibold">ServiceHub</div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">Admin</div>
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">JD</div>
      </div>
    </header>
  );
}
