"use client";
import React from "react";
import DashboardLayout from "../components/dashboard/Layout";
import PageAnalytics from "../components/dashboard/PageAnalytics";
import { useUser } from "@clerk/nextjs";
export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }
  return (
    <DashboardLayout isSignedIn={!!isSignedIn}>
      <PageAnalytics />
    </DashboardLayout>
  );
}
