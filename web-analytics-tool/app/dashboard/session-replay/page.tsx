"use client";
import React from "react";
import DashboardLayout from "@/app/components/dashboard/Layout";
import SessionReplay from "@/app/components/dashboard/SessionReplay";
import { useUser } from "@clerk/nextjs"; // Import useAuth
export default function SessionReplayPage() {
  const { isSignedIn, isLoaded } = useUser(); // Get isSignedIn from Clerk

  if (!isLoaded) {
    return null;
  }
  return (
    <DashboardLayout isSignedIn={!!isSignedIn}>
      <SessionReplay />
    </DashboardLayout>
  );
}
