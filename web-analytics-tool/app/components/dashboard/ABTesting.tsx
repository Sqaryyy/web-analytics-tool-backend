import React from "react";
import { Calendar } from "lucide-react"; // Adjust the import based on your project structure

const ABTesting = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">A/B Testing</h2>
        <div className="flex space-x-2">
          <button className="bg-[#222222] hover:bg-[#333333] px-4 py-2 rounded-lg flex items-center text-sm">
            <Calendar size={16} className="mr-2" />
            Active Tests
          </button>
          <button className="bg-[#1DCD9F] hover:bg-[#19B18A] text-black px-4 py-2 rounded-lg text-sm font-medium">
            Create New Test
          </button>
        </div>
      </div>

      <div className="bg-[#151515] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h3 className="font-medium">CTA Button Test</h3>
          <p className="text-sm text-gray-400 mt-1">
            Testing button color impact on conversion rate
          </p>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-800">
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium">Variant A</h4>
              <div className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                Original
              </div>
            </div>
            <div className="aspect-video bg-[#222222] rounded-lg mb-4 flex items-center justify-center">
              <div className="w-32 h-10 bg-blue-500 rounded flex items-center justify-center text-white font-medium">
                Buy Now
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#111111] p-3 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Visitors</p>
                <p className="text-xl font-bold">2,485</p>
              </div>
              <div className="bg-[#111111] p-3 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Conversions</p>
                <p className="text-xl font-bold">106</p>
              </div>
            </div>
            <div className="bg-[#111111] p-3 rounded-lg">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-sm font-medium">4.3%</p>
              </div>
              <div className="h-1 bg-[#222222] rounded-full">
                <div className="h-full w-[43%] bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium">Variant B</h4>
              <div className="px-2 py-1 bg-[#1DCD9F] text-black text-xs rounded">
                Challenger
              </div>
            </div>
            <div className="aspect-video bg-[#222222] rounded-lg mb-4 flex items-center justify-center">
              <div className="w-32 h-10 bg-[#1DCD9F] rounded flex items-center justify-center text-black font-medium">
                Buy Now
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#111111] p-3 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Visitors</p>
                <p className="text-xl font-bold">2,512</p>
              </div>
              <div className="bg-[#111111] p-3 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Conversions</p>
                <p className="text-xl font-bold">158</p>
              </div>
            </div>
            <div className="bg-[#111111] p-3 rounded-lg">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-sm font-medium">6.3%</p>
              </div>
              <div className="h-1 bg-[#222222] rounded-full">
                <div className="h-full w-[63%] bg-[#1DCD9F] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABTesting;
