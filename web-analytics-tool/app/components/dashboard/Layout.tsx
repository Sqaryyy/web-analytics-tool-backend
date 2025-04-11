"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SessionReplay from "./SessionReplay";
import Heatmaps from "./Heatmaps";
import PageAnalytics from "./PageAnalytics";
import ABTesting from "./ABTesting";
import Header from "./Header";
import FunnelConversions from "./FunnelConversions"; // Import the new component

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("Session Replay");

  interface TabChangeHandler {
    (tab: string): void;
  }

  const handleTabChange: TabChangeHandler = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar onTabChange={handleTabChange} activeTab={activeTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === "Session Replay" && <SessionReplay />}
          {activeTab === "Heatmaps" && <Heatmaps />}
          {activeTab === "Page Analytics" && <PageAnalytics />}
          {activeTab === "A/B Testing" && <ABTesting />}
          {activeTab === "Funnel Conversions" && <FunnelConversions />}{" "}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
