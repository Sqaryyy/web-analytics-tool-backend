"use client";
import React from "react";
import DashboardLayout from "@/app/components/dashboard/Layout";
import ABTesting from "@/app/components/dashboard/ABTesting";
import { useUser } from "@clerk/nextjs";

export default function ABTestingPage() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <DashboardLayout isSignedIn={isSignedIn}>
      <ABTesting />
    </DashboardLayout>
  );
}
