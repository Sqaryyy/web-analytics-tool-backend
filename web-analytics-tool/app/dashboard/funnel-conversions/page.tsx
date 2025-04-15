"use client";
import React from "react";
import DashboardLayout from "@/app/components/dashboard/Layout";
import FunnelConversions from "@/app/components/dashboard/FunnelConversions";
import { useUser } from "@clerk/nextjs";

export default function FunnelConversionsPage() {
  const { isSignedIn, isLoaded } = useUser(); // Get isSignedIn from Clerk

  if (!isLoaded) {
    return null;
  }
  return (
    <DashboardLayout isSignedIn={!!isSignedIn}>
      <FunnelConversions />
    </DashboardLayout>
  );
}
