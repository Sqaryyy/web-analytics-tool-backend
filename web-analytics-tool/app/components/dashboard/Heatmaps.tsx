import React from "react";
import { Calendar, ArrowUp, ArrowDown } from "lucide-react"; // Ensure this is the correct library or path for the Calendar component

const Heatmaps = () => {
  const pages = [
    { name: "Homepage", views: 14500 },
    { name: "Product Page", views: 8900 },
    { name: "Checkout", views: 4200 },
    { name: "Blog", views: 3100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Heatmaps</h2>
        <div className="flex space-x-2">
          <button className="bg-[#222222] hover:bg-[#333333] px-4 py-2 rounded-lg flex items-center text-sm">
            <Calendar size={16} className="mr-2" />
            Last 30 days
          </button>
          <button className="bg-[#1DCD9F] hover:bg-[#19B18A] text-black px-4 py-2 rounded-lg text-sm font-medium">
            Create New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <h3 className="font-medium mb-3">Pages with Heatmaps</h3>
          <div className="space-y-2">
            {pages.map((page) => (
              <div
                key={page.name}
                className="flex justify-between items-center p-2 hover:bg-[#222222] rounded cursor-pointer"
              >
                <span className="text-sm">{page.name}</span>
                <span className="text-xs text-gray-400">
                  {page.views.toLocaleString()} views
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 bg-[#151515] border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="font-medium">Homepage Heatmap</h3>
              <div className="ml-3 px-2 py-1 bg-[#222222] rounded text-xs text-gray-400">
                14.5K visitors
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-[#222222] hover:bg-[#333333] rounded text-sm">
                Click
              </button>
              <button className="px-3 py-1 rounded text-sm text-gray-400 hover:bg-[#222222]">
                Scroll
              </button>
              <button className="px-3 py-1 rounded text-sm text-gray-400 hover:bg-[#222222]">
                Move
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video bg-[#222222] flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                <img
                  src="/api/placeholder/800/450"
                  alt="Website screenshot"
                  className="w-full h-full object-cover opacity-70"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 30% 25%, rgba(255,0,0,0.5) 0%, rgba(255,100,0,0.3) 30%, rgba(255,200,0,0.1) 60%, transparent 70%),
                                 radial-gradient(circle at 70% 60%, rgba(255,0,0,0.5) 0%, rgba(255,100,0,0.3) 40%, rgba(255,200,0,0.1) 70%, transparent 80%),
                                 radial-gradient(circle at 50% 90%, rgba(255,0,0,0.4) 0%, rgba(255,100,0,0.2) 30%, rgba(255,200,0,0.1) 60%, transparent 70%)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-sm">High</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Low</span>
              </div>
            </div>
            <button className="text-sm text-[#1DCD9F]">Download as PNG</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Click Accuracy</h3>
            <div className="text-[#1DCD9F] flex items-center">
              <ArrowUp size={14} className="mr-1" />
              <span className="text-sm">8%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">94%</p>
          <p className="text-sm text-gray-400">
            Users clicking intended targets
          </p>
        </div>
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Scroll Depth</h3>
            <div className="text-[#1DCD9F] flex items-center">
              <ArrowUp size={14} className="mr-1" />
              <span className="text-sm">12%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">68%</p>
          <p className="text-sm text-gray-400">Average scroll depth</p>
        </div>
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Dead Clicks</h3>
            <div className="text-red-500 flex items-center">
              <ArrowDown size={14} className="mr-1" />
              <span className="text-sm">5%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">237</p>
          <p className="text-sm text-gray-400">Last 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default Heatmaps;
