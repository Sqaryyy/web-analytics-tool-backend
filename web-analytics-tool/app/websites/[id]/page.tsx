// File: app/websites/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";

interface WebsiteAnalyticsPageProps {
  params: { id: string };
}

const WebsiteAnalyticsPage: React.FC<WebsiteAnalyticsPageProps> = ({
  params,
}) => {
  interface AnalyticsData {
    uniqueVisitors: number;
    totalPageViews: number;
    eventsByName: Record<string, number>;
    pageViewsByPath: Record<string, number>;
    pageViewsByDay: Record<string, number>;
    referrers: Record<string, number>;
    utmSources: Record<string, number>;
    countries: Record<string, number>;
    browsers: Record<string, number>;
    operatingSystems: Record<string, number>;
    devices: Record<string, number>;
  }

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // State for error message
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const websiteId = params.id;

  useEffect(() => {
    fetchAnalytics();
  }, [websiteId, dateRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await fetch(
        `${API_URL}/api/analytics/websites/${websiteId}?from=${dateRange.from}&to=${dateRange.to}` // Corrected endpoint path
      );

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        const errorData = await response.json(); // Try to get error message from backend
        setError(errorData?.error || "Failed to fetch analytics data."); // Set error message
        console.error("Failed to fetch analytics:", response.status, errorData);
      }
    } catch (error) {
      setError("Error fetching analytics data. Please check your connection."); // Network error
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => {
    setDateRange((prev) => ({ ...prev, [type]: e.target.value }));
  };

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!analytics) {
    return <div className="p-6">No analytics data available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Website Analytics
          </h1>
          <div className="flex items-center space-x-2">
            <label htmlFor="from-date" className="text-sm text-gray-700">
              From:
            </label>
            <input
              type="date"
              id="from-date"
              value={dateRange.from}
              onChange={(e) => handleDateRangeChange(e, "from")}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <label htmlFor="to-date" className="text-sm text-gray-700">
              To:
            </label>
            <input
              type="date"
              id="to-date"
              value={dateRange.to}
              onChange={(e) => handleDateRangeChange(e, "to")}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Unique Visitors
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {analytics.uniqueVisitors}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Total Page Views
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {analytics.totalPageViews}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Events</h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(analytics.eventsByName)
                .sort(([, a], [, b]) => (b as number) - (a as number)) // Sort by event count descending
                .map(([name, count]) => (
                  <li key={name}>
                    {name}:{" "}
                    <span className="font-medium">{count as number}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Top Pages</h3>
            <ul className="list-decimal list-inside text-sm">
              {Object.entries(analytics.pageViewsByPath)
                .sort(([, a], [, b]) => b - a) // Sort by page view count descending
                .map(([path, count]) => (
                  <li key={path}>
                    {path}: <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Page Views by Day
            </h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(analytics.pageViewsByDay)
                .sort(([, a], [, b]) => (new Date(a) > new Date(b) ? 1 : -1)) // Sort by date ascending
                .map(([day, count]) => (
                  <li key={day}>
                    {day}: <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Referrers</h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(analytics.referrers)
                .sort(([, a], [, b]) => b - a)
                .map(([referrer, count]) => (
                  <li key={referrer}>
                    {referrer}: <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">UTM Sources</h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(analytics.utmSources)
                .sort(([, a], [, b]) => b - a)
                .map(([source, count]) => (
                  <li key={source}>
                    {source}: <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Countries</h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(analytics.countries)
                .sort(([, a], [, b]) => b - a)
                .map(([country, count]) => (
                  <li key={country}>
                    {country}: <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Browsers</h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(analytics.browsers)
                .sort(([, a], [, b]) => b - a)
                .map(([browser, count]) => (
                  <li key={browser}>
                    {browser}: <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Operating Systems
            </h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(analytics.operatingSystems)
                .sort(([, a], [, b]) => b - a)
                .map(([os, count]) => (
                  <li key={os}>
                    {os}: <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Devices</h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(analytics.devices)
                .sort(([, a], [, b]) => b - a)
                .map(([device, count]) => (
                  <li key={device}>
                    {device}: <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteAnalyticsPage;
