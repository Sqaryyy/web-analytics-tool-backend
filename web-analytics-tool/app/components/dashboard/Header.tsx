// app/components/dashboard/Header.tsx
"use client";

import { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="h-16 border-b border-gray-800 bg-black px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex-1 mx-10">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-[#222222] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#1DCD9F] focus:ring-1 focus:ring-[#1DCD9F]"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-[#222222]">
          <Bell size={20} className="text-gray-300" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-[#1DCD9F] rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-[#222222]">
          <Settings size={20} className="text-gray-300" />
        </button>
        <div className="h-8 w-px bg-gray-700"></div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">mywebsite.com</span>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>
    </header>
  );
}
