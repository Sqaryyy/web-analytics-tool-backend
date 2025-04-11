"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Users,
  ArrowUp,
  Database,
} from "lucide-react";

import SessionReplayPlayer from "./SessionReplayPlayer";
import { mockSessions } from "@/app/utils/mockData";

const SessionReplay = () => {
  // Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
  const [selectedSession, setSelectedSession] = useState(mockSessions[0]);
  const [startTime, setStartTime] = useState<string>("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Mark component as mounted after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const today = new Date();
      setDate(today.toLocaleDateString());
      setTime(
        today.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      setSelectedSession(mockSessions[selectedSessionIndex]);
    }
  }, [selectedSessionIndex, mounted]);

  useEffect(() => {
    if (mounted) {
      // Use a consistent date string for SSR and client
      setStartTime(new Date().toISOString());
    }
  }, [mounted]);

  const handleSessionSelect = (index: number) => {
    setSelectedSessionIndex(index);
  };

  const handlePrevSession = () => {
    setSelectedSessionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleNextSession = () => {
    setSelectedSessionIndex((prevIndex) =>
      prevIndex < mockSessions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  interface SessionEvent {
    type: string;
  }

  interface Session {
    id: string;
    userId: string;
    browser: string;
    device: string;
    duration: number;
    events: SessionEvent[];
    startTime: string;
  }

  const calculateTotalRageClicks = (session: Session): number => {
    return session.events.filter((e: SessionEvent) => e.type === "click")
      .length;
  };

  const calculateAverageSessionDuration = () => {
    const totalDuration = mockSessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    const averageDuration = totalDuration / mockSessions.length;
    return formatTime(Math.round(averageDuration));
  };

  const calculateTotalPageViews = () => {
    return 4.2;
  };

  const calculateRageClicksLast7Days = () => {
    return mockSessions.reduce(
      (sum, session) => sum + calculateTotalRageClicks(session),
      0
    );
  };

  // Use conditional rendering to avoid hydration mismatch
  if (!mounted) {
    return <div className="space-y-6">Loading session replay data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Session Replay</h2>
        <div className="flex space-x-2">
          <button className="bg-black hover:bg-gray-900 px-4 py-2 rounded-lg flex items-center text-sm">
            <Calendar size={16} className="mr-2" />
            Last 7 days
          </button>
          <button className="bg-[#1DCD9F] hover:bg-[#169976] text-black px-4 py-2 rounded-lg text-sm font-medium">
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-[#151515] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#222222] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            <span>Recording Session #{selectedSession?.id}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-[#222222] rounded-full"
              onClick={handlePrevSession}
              disabled={selectedSessionIndex === 0}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="p-2 hover:bg-[#222222] rounded-full"
              onClick={handleNextSession}
              disabled={selectedSessionIndex === mockSessions.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <SessionReplayPlayer
          session={selectedSession}
          width={800}
          height={450}
          startTime={startTime}
        />
        <div className="p-4 bg-[#151515] flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">
              User: anonymous_user_{selectedSession?.userId}
            </p>
            <p className="text-xs text-gray-500">
              {selectedSession?.browser} / {selectedSession?.device} / 1920x1080
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1 text-gray-400">
              <Clock size={14} />
              <span>
                {`${formatTime(selectedSession?.duration)} / ${formatTime(
                  selectedSession?.duration
                )}`}
              </span>
            </div>
            <div className="h-4 w-px bg-[#151515]"></div>
            <div className="flex items-center space-x-1 text-gray-400">
              <Database size={14} />
              <span>Pages: 5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Session Duration</h3>
            <div className="text-[#1DCD9F] flex items-center">
              <ArrowUp size={14} className="mr-1" />
              <span className="text-sm">12%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">
            {calculateAverageSessionDuration()}
          </p>
          <p className="text-sm text-gray-400">Avg. for last 7 days</p>
        </div>
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Page Views</h3>
            <div className="text-[#1DCD9F] flex items-center">
              <ArrowUp size={14} className="mr-1" />
              <span className="text-sm">5%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{calculateTotalPageViews()}</p>
          <p className="text-sm text-gray-400">Pages per session</p>
        </div>
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Rage Clicks</h3>
            <div className="text-red-500 flex items-center">
              <ArrowUp size={14} className="mr-1" />
              <span className="text-sm">8%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">
            {calculateRageClicksLast7Days()}
          </p>
          <p className="text-sm text-gray-400">Last 7 days</p>
        </div>
      </div>

      <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
        <h3 className="font-medium mb-4">Recent Sessions</h3>
        <div className="space-y-3">
          {mockSessions.map((session, index) => (
            <div
              key={session.id}
              className={`flex items-center p-3 hover:bg-[#222222] rounded-lg cursor-pointer ${
                selectedSessionIndex === index ? "bg-[#222222]" : ""
              }`}
              onClick={() => handleSessionSelect(index)}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-[#222222] rounded-lg flex items-center justify-center">
                <Users size={18} className="text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium">Session #{session.id}</p>
                <p className="text-xs text-gray-400">
                  {date} {time} • {formatTime(session.duration)}
                </p>
              </div>
              <button
                className="text-[#1DCD9F] hover:text-[#169976]"
                onClick={() => handleSessionSelect(index)}
              >
                <Play size={16} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionReplay;
