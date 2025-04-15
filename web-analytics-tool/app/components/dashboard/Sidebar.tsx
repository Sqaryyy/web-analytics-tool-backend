"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Eye,
  MousePointer,
  SplitSquareVertical,
  Activity,
  TrendingUp, // Import an icon for Funnel Conversions
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Page Analytics",
      icon: <BarChart2 size={18} />,
      href: "/dashboard",
    },
    {
      name: "A/B Testing",
      icon: <SplitSquareVertical size={18} />,
      href: "/dashboard/ab-testing",
    },
    {
      name: "Funnel Conversions",
      icon: <TrendingUp size={18} />,
      href: "/dashboard/funnel-conversions",
    },
    {
      name: "Session Replay",
      icon: <Eye size={18} />,
      href: "/dashboard/session-replay",
    },
    {
      name: "Heatmaps",
      icon: <MousePointer size={18} />,
      href: "/dashboard/heatmaps",
    },
  ];

  return (
    <div className="w-64 bg-[#111111] border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-8 w-8 rounded bg-[#1DCD9F] flex items-center justify-center">
            <Activity size={20} className="text-black" />
          </div>
          <h2 className="text-xl font-bold text-white">Metrix.</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.name}>
                <Link
                  href={tab.href}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                    pathname === tab.href
                      ? "bg-[#1DCD9F] text-black"
                      : "text-gray-300 hover:bg-[#222222]"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="bg-[#222222] p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Storage Usage</p>
          <div className="h-2 bg-gray-700 rounded-full mb-2">
            <div className="h-full w-2/3 bg-[#1DCD9F] rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500">67% of 500GB used</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
