"use client";
import React from "react";
import DashboardLayout from "@/app/components/dashboard/Layout";
import Heatmaps from "@/app/components/dashboard/Heatmaps";
import { useUser } from "@clerk/nextjs"; // Import useAuth
export default function HeatmapsPage() {
  const { isSignedIn, isLoaded } = useUser(); // Get isSignedIn from Clerk

  if (!isLoaded) {
    return null;
  }
  return (
    <DashboardLayout isSignedIn={!!isSignedIn}>
      <Heatmaps />
    </DashboardLayout>
  );
}
