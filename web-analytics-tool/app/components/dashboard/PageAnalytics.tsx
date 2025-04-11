import React, { useState } from "react";
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

interface AnalyticCardProps {
  title: string;
  value: string;
  change: string;
  isNegativeChange?: boolean;
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
}
interface TopPagesListProps {
  pages: TopPage[];
  itemsPerPage?: number;
}
interface TrafficPoint {
  label: string;
  value: number;
}

// --- Main Component ---
const PageAnalytics = () => {
  // --- Data ---
  const visitorsData = { value: "3,860", change: "428.0%" };
  const viewsPerVisitData = { value: "2.42", change: "-38.8%" };
  const bounceRateData = { value: "55.9%", change: "20.2%" };
  const avgVisitDurationData = { value: "53s", change: "-49.6%" };

  // --- Updated Traffic Data with different Labels ---
  const trafficData: TrafficPoint[] = [
    { label: "Jan", value: 350 },
    { label: "Feb", value: 450 },
    { label: "Mar", value: 300 },
    { label: "Apr", value: 500 },
    { label: "May", value: 600 },
    { label: "Jun", value: 400 },
    { label: "Jul", value: 700 },
    { label: "Aug", value: 550 },
    { label: "Sep", value: 650 },
    { label: "Oct", value: 750 },
    { label: "Nov", value: 500 },
    { label: "Dec", value: 800 },
  ];

  // --- Other Data (remains the same) ---
  const topPagesData: TopPage[] = [
    { name: "Homepage", views: 3845, change: 11.1 },
    { name: "/pricing", views: 1007, change: 10.8 },
    { name: "/w/*/dashboard/", views: 988, change: 10.6 },
    { name: "/w/*/visitors/", views: 597, change: 6.4 },
    { name: "/share/peasy.so/", views: 459, change: 4.9 },
    { name: "/docs", views: 350, change: 3.1 },
    { name: "/blog/new-feature", views: 210, change: -2.5 },
    { name: "/careers", views: 180, change: 1.5 },
    { name: "/integrations", views: 155, change: 0.8 },
  ];
  const trafficSourcesData: AnalyticsListItem[] = [
    { name: "Direct/Unknown", value: 1930, percentage: 50.0 },
    { name: "www.reddit.com", value: 543, percentage: 14.1 },
    { name: "www.indiehackers.com", value: 300, percentage: 7.8 },
    { name: "com.reddit.frontpage", value: 297, percentage: 7.7 },
    { name: "Google Search", value: 210, percentage: 5.4 },
    { name: "Twitter / X", value: 150, percentage: 3.9 },
    { name: "LinkedIn", value: 80, percentage: 2.1 },
  ];
  const browserTypeData: AnalyticsListItem[] = [
    { name: "Chrome", value: 2500, percentage: 64.8 },
    { name: "Safari", value: 650, percentage: 16.8 },
    { name: "Firefox", value: 410, percentage: 10.6 },
    { name: "Edge", value: 300, percentage: 7.8 },
    { name: "Brave", value: 55, percentage: 1.4 },
    { name: "Opera", value: 35, percentage: 0.9 },
  ];
  const osTypeData: AnalyticsListItem[] = [
    { name: "Windows", value: 1800, percentage: 46.6 },
    { name: "macOS", value: 1100, percentage: 28.5 },
    { name: "Linux", value: 450, percentage: 11.7 },
    { name: "iOS", value: 310, percentage: 8.0 },
    { name: "Android", value: 200, percentage: 5.2 },
  ];
  const locationData: AnalyticsListItem[] = [
    { name: "United States", value: 1200, percentage: 31.1 },
    { name: "India", value: 450, percentage: 11.7 },
    { name: "Germany", value: 380, percentage: 9.8 },
    { name: "United Kingdom", value: 320, percentage: 8.3 },
    { name: "Canada", value: 250, percentage: 6.5 },
    { name: "France", value: 180, percentage: 4.7 },
    { name: "Brazil", value: 150, percentage: 3.9 },
    { name: "Australia", value: 120, percentage: 3.1 },
  ];
  const deviceTypeData: AnalyticsListItem[] = [
    { name: "Desktop", value: 2200, percentage: 57.0 },
    { name: "Mobile", value: 1360, percentage: 35.2 },
    { name: "Tablet", value: 300, percentage: 7.8 },
  ];
  const customEventsData: AnalyticsListItem[] = [
    { name: "Signup Button Click", value: 550, percentage: 14.2 },
    { name: "Pricing Page View", value: 1007, percentage: 26.1 },
    { name: "Download Report Click", value: 120, percentage: 3.1 },
    { name: "Video Play", value: 85, percentage: 2.2 },
    { name: "Contact Form Submit", value: 45, percentage: 1.2 },
    { name: "Feature X Used", value: 300, percentage: 7.8 },
    { name: "Upgrade Attempt", value: 95, percentage: 2.5 },
  ];

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

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AnalyticCard
          title="Visitors"
          value={visitorsData.value}
          change={visitorsData.change}
        />
        <AnalyticCard
          title="Views per Visit"
          value={viewsPerVisitData.value}
          change={viewsPerVisitData.change}
          isNegativeChange={true}
        />
        <AnalyticCard
          title="Bounce Rate"
          value={bounceRateData.value}
          change={bounceRateData.change}
          isNegativeChange={true}
        />
        <AnalyticCard
          title="Avg. Visit Duration"
          value={avgVisitDurationData.value}
          change={avgVisitDurationData.change}
          isNegativeChange={true}
        />
      </div>

      {/* Traffic Overview & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#151515] border border-gray-800 rounded-xl p-5">
          <h3 className="font-medium mb-6">Traffic Overview</h3>
          {/* Pass the updated trafficData */}
          <TrafficOverviewChart data={trafficData} />
        </div>
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <TopPagesList pages={topPagesData} itemsPerPage={5} />
        </div>
      </div>

      {/* Other cards remain the same */}
      {/* Traffic Sources, Browser, OS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsListCard
          title="Traffic Sources"
          items={trafficSourcesData}
          itemsPerPage={5}
        />
        <AnalyticsListCard
          title="Browser Type"
          items={browserTypeData}
          itemsPerPage={5}
        />
        <AnalyticsListCard
          title="OS Type"
          items={osTypeData}
          itemsPerPage={5}
        />
      </div>

      {/* Location, Device Type, Custom Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsListCard
          title="Location"
          items={locationData}
          itemsPerPage={5}
        />
        <AnalyticsListCard
          title="Device Type"
          items={deviceTypeData}
          itemsPerPage={5}
        />
        <AnalyticsListCard
          title="Custom Events"
          items={customEventsData}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};

// --- Sub-Components ---

// AnalyticCard component remains the same
const AnalyticCard = ({
  title,
  value,
  change,
  isNegativeChange = false,
}: AnalyticCardProps) => {
  const changeIsNegativeActual = change.startsWith("-");
  const displayNegative = isNegativeChange || changeIsNegativeActual;
  const colorClass = displayNegative ? "text-red-500" : "text-[#1DCD9F]";

  return (
    <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
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

// TopPagesList component remains the same
const TopPagesList = ({ pages, itemsPerPage = 5 }: TopPagesListProps) => {
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
    <div className="h-full flex flex-col">
      <h3 className="font-medium mb-4 flex-shrink-0">Top Pages</h3>
      <div className="space-y-3 flex-grow">
        {displayedPages.map((page) => (
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
        {displayedPages.length < itemsPerPage && (
          <div
            style={{
              height: `${
                (itemsPerPage - displayedPages.length) * approxItemHeight
              }px`,
            }}
          ></div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1 rounded cursor-pointer hover:bg-[#222222] disabled:opacity-50 disabled:cursor-default"
            aria-label="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-1 rounded cursor-pointer hover:bg-[#222222] disabled:opacity-50 disabled:cursor-default"
            aria-label="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
      {totalPages <= 1 && <div className="h-[37px] mt-4 flex-shrink-0"></div>}
    </div>
  );
};

// AnalyticsListCard component remains the same
const AnalyticsListCard = ({
  title,
  items,
  itemsPerPage = 5,
}: AnalyticsListCardProps) => {
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
    <div className="bg-[#151515] border border-gray-800 rounded-xl p-5 h-full flex flex-col">
      <h3 className="font-medium mb-4 flex-shrink-0">{title}</h3>
      <div className="space-y-3 flex-grow">
        {displayedItems.map((item) => (
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
        ))}
        {displayedItems.length < itemsPerPage && (
          <div
            style={{
              height: `${
                (itemsPerPage - displayedItems.length) * approxItemHeight
              }px`,
            }}
          ></div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1 rounded cursor-pointer hover:bg-[#222222] disabled:opacity-50 disabled:cursor-default"
            aria-label="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-1 rounded cursor-pointer hover:bg-[#222222] disabled:opacity-50 disabled:cursor-default"
            aria-label="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
      {totalPages <= 1 && <div className="h-[37px] mt-4 flex-shrink-0"></div>}
    </div>
  );
};

export default PageAnalytics;
