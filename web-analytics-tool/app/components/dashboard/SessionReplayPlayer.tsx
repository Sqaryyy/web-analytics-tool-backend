"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReplayEvent, SessionData } from "@/app/utils/mockData";
import { TrendingUp, TrendingDown, Circle } from "lucide-react";

interface SessionReplayProps {
  session: SessionData;
  width: number;
  height: number;
  startTime: string; // Date passed from parent component
}

const SessionReplayPlayer: React.FC<SessionReplayProps> = ({
  session,
  width,
  height,
  startTime,
}) => {
  // Use client-side only rendering for state initialization
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [events, setEvents] = useState<ReplayEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<ReplayEvent | null>(null);
  const [clicks, setClicks] = useState<{ x: number; y: number; id: string }[]>(
    []
  );
  const [formattedDate, setFormattedDate] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const totalDurationRef = useRef<number>(0);

  // Animation start time
  const [animationStartTime, setAnimationStartTime] = useState(0);

  // Format time as MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Mark component as mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    setAnimationStartTime(performance.now());
  }, []);

  // Initialize session events
  useEffect(() => {
    if (session && session.events && mounted) {
      setEvents(session.events);
      if (session.events.length > 0) {
        setCurrentEvent(session.events[0]);
        totalDurationRef.current =
          session.events[session.events.length - 1].timestamp;
      }
    }
  }, [session, mounted]);

  // Format date
  useEffect(() => {
    if (startTime && mounted) {
      try {
        setFormattedDate(new Date(startTime).toLocaleDateString());
      } catch (e) {
        setFormattedDate("Invalid date");
      }
    }
  }, [startTime, mounted]);

  // Animation loop for replay
  useEffect(() => {
    if (!isPlaying || !events.length || !mounted) return;

    // Start time of the animation
    startTimeRef.current = performance.now() - currentTime;

    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      setCurrentTime(elapsed);

      // Calculate progress percentage
      const totalDuration =
        totalDurationRef.current || events[events.length - 1].timestamp;
      const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(progressPercent);

      // Find the current event based on elapsed time
      const currentEventIndex = findEventIndexAtTime(elapsed);
      if (currentEventIndex >= 0) {
        const latest = events[currentEventIndex];
        setCurrentEvent(latest);

        // Update cursor position
        updateCursorPosition(latest);

        // Add click visualization
        if (
          latest.type === "click" &&
          lastTimeRef.current !== latest.timestamp
        ) {
          lastTimeRef.current = latest.timestamp;
          const newClick = {
            x: latest.x,
            y: latest.y,
            id: `click-${Date.now()}-${Math.random()}`, // Ensure unique ID
          };
          setClicks((prev) => [...prev, newClick]);
        }
      }

      // Stop replay if we've reached the end
      if (elapsed >= totalDuration) {
        setIsPlaying(false);
        setProgress(100);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup animation on unmount or when play state changes
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, events, mounted]);

  // Find event at specific time using binary search for performance
  const findEventIndexAtTime = (time: number) => {
    let start = 0;
    let end = events.length - 1;
    let result = -1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (events[mid].timestamp <= time) {
        result = mid;
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

    return result;
  };

  // Update cursor position based on event
  const updateCursorPosition = (event: ReplayEvent) => {
    if (cursorRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const xPos = (event.x * containerRect.width) / 100;
      const yPos = (event.y * containerRect.height) / 100;

      cursorRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
  };

  // Clean up old click effects
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setClicks((prevClicks) => {
        // Keep only the 20 most recent clicks for better performance
        if (prevClicks.length > 20) {
          return prevClicks.slice(prevClicks.length - 20);
        }
        return prevClicks;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // If we're at the end, restart from beginning
      if (progress >= 100) {
        setCurrentTime(0);
        setProgress(0);
        setClicks([]);
        startTimeRef.current = performance.now();
      } else {
        startTimeRef.current = performance.now() - currentTime;
      }
      setIsPlaying(true);
    }
  };

  // Handle seek
  const handleSeek = (value: number) => {
    if (!events.length) return;

    const totalDuration =
      totalDurationRef.current || events[events.length - 1].timestamp;
    const newTime = (totalDuration * value) / 100;

    // Stop animation if playing
    if (isPlaying && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    setCurrentTime(newTime);
    setProgress(value);
    startTimeRef.current = performance.now() - newTime;

    // Clear previous clicks when seeking
    setClicks([]);

    // Find the current event based on the new time
    const currentEventIndex = findEventIndexAtTime(newTime);
    if (currentEventIndex >= 0) {
      const latestEvent = events[currentEventIndex];
      setCurrentEvent(latestEvent);

      // Update cursor position immediately
      setTimeout(() => updateCursorPosition(latestEvent), 0);
    }

    // Restart animation if was playing
    if (isPlaying) {
      requestAnimationFrame(() => {
        startTimeRef.current = performance.now() - newTime;
        animationRef.current = requestAnimationFrame(animate);
      });
    }
  };

  // Animation function extracted for reuse
  const animate = (time: number) => {
    const elapsed = time - startTimeRef.current;
    setCurrentTime(elapsed);

    const totalDuration =
      totalDurationRef.current || events[events.length - 1].timestamp;
    const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
    setProgress(progressPercent);

    const currentEventIndex = findEventIndexAtTime(elapsed);
    if (currentEventIndex >= 0) {
      const latest = events[currentEventIndex];
      setCurrentEvent(latest);
      updateCursorPosition(latest);

      if (latest.type === "click" && lastTimeRef.current !== latest.timestamp) {
        lastTimeRef.current = latest.timestamp;
        const newClick = {
          x: latest.x,
          y: latest.y,
          id: `click-${Date.now()}-${Math.random()}`,
        };
        setClicks((prev) => [...prev, newClick]);
      }
    }

    if (elapsed >= totalDuration) {
      setIsPlaying(false);
      setProgress(100);
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Use conditional rendering to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="rounded-lg border border-[#222222] bg-black p-4">
        Loading session replay...
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#222222] bg-black">
      {/* Session info bar */}
      <div className="flex justify-between items-center border-b border-[#222222] p-3">
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-[#1DCD9F]/10 text-[#1DCD9F] mr-2">
            {session.conversionSuccess ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </span>
          <span className="font-medium">Session: {session.id}</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <span className="mr-4">{formattedDate}</span>
          <span>
            {session.device} / {session.browser}
          </span>
        </div>
      </div>

      {/* Replay area */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-black w-full rounded-b-lg"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        {/* Real website content would be rendered here */}
        {session.contentSnapshot && (
          <div
            className="absolute inset-0"
            dangerouslySetInnerHTML={{ __html: session.contentSnapshot }}
          />
        )}

        {/* Cursor element */}
        <div
          ref={cursorRef}
          className="absolute pointer-events-none z-50"
          style={{
            left: 0,
            top: 0,
            transform: "translate(0, 0)",
            willChange: "transform",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M2.5 2L10 18L13 11L19.5 8L2.5 2Z"
              fill="white"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Click visualizations */}
        {clicks.map((click) => (
          <div
            key={click.id}
            className="absolute pointer-events-none w-8 h-8 -ml-4 -mt-4 rounded-full bg-[#1DCD9F]/30 animate-ping"
            style={{
              left: `${(click.x * width) / 100}px`,
              top: `${(click.y * height) / 100}px`,
            }}
          ></div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-3 border-t border-[#222222]">
        <div className="flex items-center mb-2">
          <button
            onClick={togglePlay}
            className="mr-2 h-8 w-8 flex items-center justify-center bg-[#222222] hover:bg-[#333333] rounded-full"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <span className="flex items-center justify-center h-4 w-4">
                ■
              </span>
            ) : (
              <span className="flex items-center justify-center h-4 w-4 pl-0.5">
                ▶
              </span>
            )}
          </button>

          <span className="text-sm mr-2 w-24">
            {formatTime(currentTime)} /{" "}
            {formatTime((session.duration || 0) * 1000)}
          </span>

          <div className="flex-grow px-2">
            <div className="h-2 bg-[#222222] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1DCD9F]"
                style={{ width: `${progress}%` }}
                onClick={(e) => {
                  if (!containerRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const pct = (clickX / rect.width) * 100;
                  handleSeek(pct);
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Event info */}
        <div className="text-sm text-gray-400 flex items-center">
          <Circle className="h-3 w-3 mr-1 text-[#1DCD9F]" />
          Current event: {currentEvent?.type || "none"} at (
          {currentEvent?.x.toFixed(0) || 0}, {currentEvent?.y.toFixed(0) || 0})
        </div>
      </div>

      <style jsx>{`
        @keyframes click-animation {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SessionReplayPlayer;
