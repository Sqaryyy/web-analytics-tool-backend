import React, { useState, useEffect } from "react";
import {
  Calendar,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define interfaces for API response
interface ApiResponse {
  metrics: {
    visitors: {
      count: number;
      change: string;
    };
    viewsPerVisit: {
      count: string;
      change: string;
    };
    bounceRate: {
      rate: string;
      change: string;
    };
    avgVisitDuration: {
      seconds: number;
      change: string;
    };
  };
  trafficOverview: Array<{
    month: string;
    count: number;
  }>;
  topPages: Array<{
    page: string;
    views: number;
    change: string;
  }>;
  trafficSources: Array<{
    source: string;
    count: number;
    percentage: string;
  }>;
  browserTypes: Array<{
    browser: string;
    count: number;
    percentage: string;
  }>;
  osTypes: Array<{
    os: string;
    count: number;
    percentage: string;
  }>;
  locations: Array<{
    country: string;
    count: number;
    percentage: string;
  }>;
  deviceTypes: Array<{
    device: string;
    count: number;
    percentage: string;
  }>;
  customEvents: Array<{
    name: string;
    count: number;
    percentage: string;
  }>;
}

// Existing interface definitions
interface AnalyticCardProps {
  title: string;
  value: string;
  change: string;
  isNegativeChange?: boolean;
  isLoading?: boolean;
}

interface TopPage {
  name: string;
  views: number;
  change: number;
}

interface AnalyticsListItem {
  name: string;
  value: number;
  percentage: number;
}

interface AnalyticsListCardProps {
  title: string;
  items: AnalyticsListItem[];
  itemsPerPage?: number;
  isLoading?: boolean;
}

interface TopPagesListProps {
  pages: TopPage[];
  itemsPerPage?: number;
  isLoading?: boolean;
}

interface TrafficPoint {
  label: string;
  value: number;
}

// Skeleton Pulse Animation
const SkeletonPulse = ({ className }: { className: string }) => {
  return (
    <div className={`bg-gray-700 animate-pulse rounded ${className}`}></div>
  );
};

// --- Main Component ---
const PageAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard?websiteId=67fb8e5e82512ada9636be1f"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setDashboardData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Transform API data for components
  const transformTopPages = (): TopPage[] => {
    if (
      !dashboardData ||
      !dashboardData.topPages ||
      dashboardData.topPages.length === 0
    )
      return [];

    return dashboardData.topPages.map((page) => ({
      name: page.page,
      views: page.views,
      change: parseFloat(page.change),
    }));
  };

  const transformTrafficSources = (): AnalyticsListItem[] => {
    if (
      !dashboardData ||
      !dashboardData.trafficSources ||
      dashboardData.trafficSources.length === 0
    )
      return [];

    return dashboardData.trafficSources.map((source) => ({
      name: source.source,
      value: source.count,
      percentage: parseFloat(source.percentage),
    }));
  };

  const transformBrowserTypes = (): AnalyticsListItem[] => {
    if (
      !dashboardData ||
      !dashboardData.browserTypes ||
      dashboardData.browserTypes.length === 0
    )
      return [];

    return dashboardData.browserTypes.map((browser) => ({
      name: browser.browser,
      value: browser.count,
      percentage: parseFloat(browser.percentage),
    }));
  };

  const transformOsTypes = (): AnalyticsListItem[] => {
    if (
      !dashboardData ||
      !dashboardData.osTypes ||
      dashboardData.osTypes.length === 0
    )
      return [];

    return dashboardData.osTypes.map((os) => ({
      name: os.os,
      value: os.count,
      percentage: parseFloat(os.percentage),
    }));
  };

  const transformLocations = (): AnalyticsListItem[] => {
    if (
      !dashboardData ||
      !dashboardData.locations ||
      dashboardData.locations.length === 0
    )
      return [];

    return dashboardData.locations.map((location) => ({
      name: location.country,
      value: location.count,
      percentage: parseFloat(location.percentage),
    }));
  };

  const transformDeviceTypes = (): AnalyticsListItem[] => {
    if (
      !dashboardData ||
      !dashboardData.deviceTypes ||
      dashboardData.deviceTypes.length === 0
    )
      return [];

    return dashboardData.deviceTypes.map((device) => ({
      name: device.device,
      value: device.count,
      percentage: parseFloat(device.percentage),
    }));
  };

  const transformCustomEvents = (): AnalyticsListItem[] => {
    if (
      !dashboardData ||
      !dashboardData.customEvents ||
      dashboardData.customEvents.length === 0
    )
      return [];

    return dashboardData.customEvents.map((event) => ({
      name: event.name,
      value: event.count,
      percentage: parseFloat(event.percentage),
    }));
  };

  const transformTrafficData = (): TrafficPoint[] => {
    if (
      !dashboardData ||
      !dashboardData.trafficOverview ||
      dashboardData.trafficOverview.length === 0
    )
      return [];

    return dashboardData.trafficOverview.map((point) => ({
      label: point.month,
      value: point.count,
    }));
  };

  const noVisitorData = "No visitor data available";

  // --- Render ---
  return (
    <div className="space-y-6 bg-[#09090B] text-gray-100 p-6 rounded-lg">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Page Analytics</h2>
        <div className="flex space-x-2">
          <button className="bg-[#222222] hover:bg-[#333333] px-4 py-2 rounded-lg flex items-center text-sm cursor-pointer">
            <Calendar size={16} className="mr-2" />
            Last 30 days
          </button>
          <button className="bg-[#1DCD9F] hover:bg-[#19B18A] text-black px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
            Download Report
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AnalyticCard
          title="Visitors"
          value={
            dashboardData
              ? dashboardData.metrics.visitors.count.toLocaleString()
              : "0"
          }
          change={
            dashboardData ? `${dashboardData.metrics.visitors.change}%` : "0%"
          }
          isLoading={isLoading}
        />
        <AnalyticCard
          title="Views per Visit"
          value={
            dashboardData ? dashboardData.metrics.viewsPerVisit.count : "0"
          }
          change={
            dashboardData
              ? `${dashboardData.metrics.viewsPerVisit.change}%`
              : "0%"
          }
          isNegativeChange={dashboardData?.metrics.viewsPerVisit.change.startsWith(
            "-"
          )}
          isLoading={isLoading}
        />
        <AnalyticCard
          title="Bounce Rate"
          value={
            dashboardData ? `${dashboardData.metrics.bounceRate.rate}%` : "0%"
          }
          change={
            dashboardData ? `${dashboardData.metrics.bounceRate.change}%` : "0%"
          }
          isNegativeChange={
            dashboardData?.metrics.bounceRate.change.startsWith("-")
              ? false
              : true
          }
          isLoading={isLoading}
        />
        <AnalyticCard
          title="Avg. Visit Duration"
          value={
            dashboardData
              ? `${dashboardData.metrics.avgVisitDuration.seconds}s`
              : "0s"
          }
          change={
            dashboardData
              ? `${dashboardData.metrics.avgVisitDuration.change}%`
              : "0%"
          }
          isNegativeChange={dashboardData?.metrics.avgVisitDuration.change.startsWith(
            "-"
          )}
          isLoading={isLoading}
        />
      </div>

      {/* Traffic Overview & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#151515] border border-gray-800 rounded-xl p-5">
          <h3 className="font-medium mb-6">Traffic Overview</h3>
          {isLoading ? (
            <div className="h-[380px] w-full flex items-center justify-center">
              <SkeletonPulse className="h-[300px] w-full" />
            </div>
          ) : transformTrafficData().length > 0 ? (
            <TrafficOverviewChart data={transformTrafficData()} />
          ) : (
            <div className="h-[380px] w-full flex items-center justify-center">
              {noVisitorData}
            </div>
          )}
        </div>
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5 flex flex-col">
          <h3 className="font-medium mb-4 flex-shrink-0">Top Pages</h3>
          {transformTopPages().length > 0 ? (
            <TopPagesList
              pages={transformTopPages()}
              itemsPerPage={5}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex-grow flex items-center justify-center">
              {noVisitorData}
            </div>
          )}
        </div>
      </div>

      {/* Traffic Sources, Browser, OS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsListCard
          title="Traffic Sources"
          items={transformTrafficSources()}
          itemsPerPage={5}
          isLoading={isLoading}
          emptyMessage={noVisitorData}
        />
        <AnalyticsListCard
          title="Browser Type"
          items={transformBrowserTypes()}
          itemsPerPage={5}
          isLoading={isLoading}
          emptyMessage={noVisitorData}
        />
        <AnalyticsListCard
          title="OS Type"
          items={transformOsTypes()}
          itemsPerPage={5}
          isLoading={isLoading}
          emptyMessage={noVisitorData}
        />
      </div>

      {/* Location, Device Type, Custom Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsListCard
          title="Location"
          items={transformLocations()}
          itemsPerPage={5}
          isLoading={isLoading}
          emptyMessage={noVisitorData}
        />
        <AnalyticsListCard
          title="Device Type"
          items={transformDeviceTypes()}
          itemsPerPage={5}
          isLoading={isLoading}
          emptyMessage={noVisitorData}
        />
        <AnalyticsListCard
          title="Custom Events"
          items={transformCustomEvents()}
          itemsPerPage={5}
          isLoading={isLoading}
          emptyMessage={noVisitorData}
        />
      </div>
    </div>
  );
};

// AnalyticCard component with skeleton
const AnalyticCard = ({
  title,
  value,
  change,
  isNegativeChange = false,
  isLoading = false,
}: AnalyticCardProps) => {
  const changeIsNegativeActual = change.startsWith("-");
  const displayNegative = isNegativeChange || changeIsNegativeActual;
  const colorClass = displayNegative ? "text-red-500" : "text-[#1DCD9F]";

  if (isLoading) {
    return (
      <div className="bg-[#151515] border border-gray-800 rounded-xl p-5 ">
        <div className="flex justify-between items-start mb-7">
          <SkeletonPulse className="h-5 w-24" />
          <SkeletonPulse className="h-4 w-16" />
        </div>
        <SkeletonPulse className="h-8 w-20 mb-1" />
        <SkeletonPulse className="h-4 w-24" />
      </div>
    );
  }

  return (
    <div className="bg-[#151515] border border-gray-800 rounded-xl p-5 ">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium text-base">{title}</h3>
        <div className={`flex items-center ${colorClass}`}>
          {displayNegative ? (
            <ArrowDown size={14} className="mr-1" />
          ) : (
            <ArrowUp size={14} className="mr-1" />
          )}
          <span className="text-sm">{change.replace("-", "")}</span>
        </div>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-400">Last 30 days</p>
    </div>
  );
};

const TrafficOverviewChart = ({ data }: { data: TrafficPoint[] }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#333333] text-gray-100 p-2 rounded">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="label" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#1DCD9F" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// TopPagesList component with skeleton
const TopPagesList = ({
  pages,
  itemsPerPage = 5,
  isLoading = false,
}: TopPagesListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(pages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedPages = pages.slice(startIndex, endIndex);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const approxItemHeight = 60;

  return (
    <div className=" flex flex-col">
      <div className="space-y-3 flex-grow">
        {isLoading
          ? Array(itemsPerPage)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-[#111111] rounded-lg p-3.5 flex justify-between items-center"
                >
                  <div>
                    <SkeletonPulse className="h-4 w-28 mb-1" />
                    <SkeletonPulse className="h-3 w-16" />
                  </div>
                  <SkeletonPulse className="h-5 w-12" />
                </div>
              ))
          : displayedPages.map((page) => (
              <div
                key={page.name}
                className="bg-[#111111] rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p
                    className="text-sm font-medium truncate max-w-[120px] sm:max-w-[150px]"
                    title={page.name}
                  >
                    {page.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {page.views.toLocaleString()} views
                  </p>
                </div>
                <div
                  className={`flex items-center flex-shrink-0 ${
                    page.change >= 0 ? "text-[#1DCD9F]" : "text-red-500"
                  }`}
                >
                  {page.change >= 0 ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  )}
                  <span className="text-sm ml-1">{Math.abs(page.change)}%</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

// AnalyticsListCard component with skeleton
const AnalyticsListCard = ({
  title,
  items,
  itemsPerPage = 5,
  isLoading = false,
  emptyMessage = "No data available",
}: AnalyticsListCardProps & { emptyMessage?: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const approxItemHeight = 52;

  return (
    <div className="bg-[#151515] border border-gray-800 rounded-xl p-5  flex flex-col">
      <h3 className="font-medium mb-4 flex-shrink-0">{title}</h3>
      <div className="space-y-3 flex-grow">
        {isLoading ? (
          Array(itemsPerPage)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-[#111111] rounded-lg p-3.5 flex justify-between items-center"
              >
                <SkeletonPulse className="h-4 w-28" />
                <SkeletonPulse className="h-4 w-20" />
              </div>
            ))
        ) : items.length === 0 ? (
          <div className=" flex items-center justify-center h-[280px]">
            {emptyMessage}
          </div>
        ) : (
          displayedItems.map((item) => (
            <div
              key={item.name}
              className="bg-[#111111] rounded-lg p-3 flex justify-between items-center"
            >
              <p
                className="text-sm font-medium truncate max-w-[120px] sm:max-w-[150px]"
                title={item.name}
              >
                {item.name}
              </p>
              <p className="text-sm text-gray-400 text-right flex-shrink-0">
                {item.value.toLocaleString()} ({item.percentage}%)
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PageAnalytics;
