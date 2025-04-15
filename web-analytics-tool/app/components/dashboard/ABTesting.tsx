import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Plus,
  Edit,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Code,
  BarChart2,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle, // Added for copy success
} from "lucide-react";

// --- Interfaces ---
interface TestVariant {
  id: string; // Unique ID for the variant (e.g., 'control', 'variant-b')
  name: string; // User-friendly name (e.g., 'Control', 'Red Button')
  code: string; // String representation of the JSX/TSX code for this variant
  previewComponent: string; // String representation of simplified HTML/JSX for preview
  impressions: number; // Number of times this variant was shown
  conversions: number; // Number of conversions attributed to this variant
}

// Added selectedVariantIndex to track which variant is shown in the details pane
interface Test {
  id: string; // Unique ID for the test (e.g., 'homepage-hero-test')
  name: string; // User-friendly name for the test
  description: string; // What the test is trying to achieve
  isActive: boolean; // Whether the test is currently running
  createdAt: string; // User-friendly date string
  lastUpdated: string; // User-friendly date string
  variants: TestVariant[];
  conversionRate?: number; // Optional: Overall or control conversion rate for comparison
  isExpanded?: boolean; // UI state: whether the test details are shown in the list
  selectedVariantIndex?: number; // UI state: index of the variant selected for the details pane
}

// --- Skeleton Pulse Animation ---
const SkeletonPulse = ({ className }: { className: string }) => {
  return (
    <div className={`bg-gray-700/50 animate-pulse rounded ${className}`}></div>
  );
};

// --- Preview Component ---
// Renders HTML string for preview. Use with caution in production!
const PreviewComponent = ({ htmlContent }: { htmlContent: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

// --- Main Dashboard Component ---
const ABTestingDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null); // Holds the *entire* selected test object
  const [isViewingCode, setIsViewingCode] = useState(false); // Toggle for details/code view in right panel
  const [showActiveOnly, setShowActiveOnly] = useState(false); // Filter toggle
  const [copiedCode, setCopiedCode] = useState(false); // Feedback for copy button

  // Simulate loading state and fetch data
  useEffect(() => {
    const timer = setTimeout(() => {
      setTests(initializeTestData(demoTestData)); // Initialize with calculated rates etc.
      setIsLoading(false);
    }, 1500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // Helper to calculate conversion rate safely
  const calculateRate = (conversions: number, impressions: number): number => {
    return impressions > 0 ? conversions / impressions : 0;
  };

  // Initialize test data (e.g., calculate initial overall rate)
  const initializeTestData = (data: Test[]): Test[] => {
    return data.map((test) => ({
      ...test,
      // Set a base conversion rate (e.g., from control variant) for comparison
      conversionRate:
        test.variants.length > 0
          ? calculateRate(
              test.variants[0].conversions,
              test.variants[0].impressions
            )
          : 0,
      isExpanded: false, // Start collapsed
      selectedVariantIndex: 0, // Default to showing the first variant (control)
    }));
  };

  // Toggle Active/Inactive state of a test
  const toggleTestActive = (testId: string) => {
    setTests((prevTests) =>
      prevTests.map((test) =>
        test.id === testId
          ? { ...test, isActive: !test.isActive, lastUpdated: "Just now" }
          : test
      )
    );
    // Also update selectedTest if it's the one being toggled
    if (selectedTest?.id === testId) {
      setSelectedTest((prev) =>
        prev
          ? { ...prev, isActive: !prev.isActive, lastUpdated: "Just now" }
          : null
      );
    }
  };

  // Toggle Expanded/Collapsed state in the list view
  const toggleTestExpanded = (testId: string) => {
    setTests((prevTests) =>
      prevTests.map((test) =>
        test.id === testId ? { ...test, isExpanded: !test.isExpanded } : test
      )
    );
  };

  // Handle selecting a test/variant to view details
  const handleSelectVariant = (test: Test, variantIndex: number) => {
    setSelectedTest({ ...test, selectedVariantIndex: variantIndex });
    setIsViewingCode(false); // Default to details view when selecting
    setCopiedCode(false); // Reset copy feedback
  };

  // Handle selecting a *different* variant within the *already selected* test's details panel
  const handleSelectVariantInDetails = (variantIndex: number) => {
    if (selectedTest) {
      setSelectedTest({ ...selectedTest, selectedVariantIndex: variantIndex });
      setCopiedCode(false); // Reset copy feedback if switching variants in code view
    }
  };

  // Filter tests based on the toggle
  const displayedTests = useMemo(() => {
    return showActiveOnly ? tests.filter((test) => test.isActive) : tests;
  }, [tests, showActiveOnly]);

  // Get the currently selected variant object based on selectedTest state
  const currentSelectedVariant = useMemo(() => {
    if (
      !selectedTest ||
      typeof selectedTest.selectedVariantIndex === "undefined"
    )
      return null;
    return selectedTest.variants[selectedTest.selectedVariantIndex];
  }, [selectedTest]);

  // Handle copying code to clipboard
  const handleCopyCode = () => {
    if (currentSelectedVariant?.code) {
      navigator.clipboard
        .writeText(currentSelectedVariant.code)
        .then(() => {
          setCopiedCode(true);
          setTimeout(() => setCopiedCode(false), 2000); // Reset after 2s
        })
        .catch((err) => {
          console.error("Failed to copy code:", err);
          // Optionally show an error message to the user
        });
    }
  };

  // --- Render ---
  return (
    <div className="space-y-6 bg-[#09090B] text-gray-100 p-4 md:p-6 rounded-lg min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-white">
          A/B Testing Management
        </h1>
        <div className="flex items-center space-x-2">
          {/* Placeholder Date Range - Non-functional */}
          <button className="bg-[#1F1F1F] border border-gray-700 hover:bg-[#2a2a2a] px-3 py-1.5 rounded-md flex items-center text-sm text-gray-300 cursor-not-allowed opacity-70">
            <Calendar size={16} className="mr-2" />
            Last 30 days
          </button>
          {/* Placeholder New Test Button - Non-functional */}
          <button className="bg-[#1DCD9F] hover:bg-[#19B18A] text-black px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer flex items-center">
            <Plus size={16} className="mr-1.5" />
            New Test
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Tests List Panel (Left/Main) --- */}
        <div className="lg:col-span-2 bg-[#151515] border border-gray-800 rounded-xl p-4 md:p-5 shadow-lg">
          {/* Panel Header & Filter */}
          <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
            <h2 className="text-lg font-semibold text-white">Your A/B Tests</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Show Active Only</span>
              <button
                onClick={() => setShowActiveOnly(!showActiveOnly)}
                className={`p-1 rounded-full transition-colors duration-200 ${
                  showActiveOnly
                    ? "text-[#1DCD9F]"
                    : "text-gray-500 hover:text-gray-300"
                }`}
                title={
                  showActiveOnly ? "Show All Tests" : "Show Only Active Tests"
                }
              >
                {showActiveOnly ? (
                  <ToggleRight size={24} />
                ) : (
                  <ToggleLeft size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Tests List */}
          {isLoading ? (
            // Loading Skeletons
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#1F1F1F]/50 border border-gray-800 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <SkeletonPulse className="h-5 w-40" />
                    <SkeletonPulse className="h-5 w-16 rounded-full" />
                  </div>
                  <SkeletonPulse className="h-4 w-full" />
                  <div className="flex justify-between items-center">
                    <SkeletonPulse className="h-3 w-28" />
                    <SkeletonPulse className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Actual Test List or Empty State
            <div className="space-y-3">
              {displayedTests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Layers size={32} className="mx-auto mb-3 opacity-50" />
                  <p>
                    {showActiveOnly
                      ? "No active tests found."
                      : "No tests created yet."}
                  </p>
                  {showActiveOnly && (
                    <button
                      onClick={() => setShowActiveOnly(false)}
                      className="text-sm text-[#1DCD9F] hover:underline mt-2"
                    >
                      View all tests
                    </button>
                  )}
                  {!showActiveOnly && (
                    <button className="bg-[#1DCD9F] hover:bg-[#19B18A] text-black px-3 py-1 rounded text-sm font-semibold mt-3 inline-flex items-center">
                      <Plus size={14} className="mr-1" /> Create First Test
                    </button>
                  )}
                </div>
              ) : (
                // Map through filtered tests
                displayedTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-[#1F1F1F] border border-gray-800 rounded-lg overflow-hidden transition-shadow hover:shadow-md"
                  >
                    {/* Test Header (Clickable for Expand/Collapse) */}
                    <div
                      className="p-3 md:p-4 cursor-pointer hover:bg-[#2a2a2a]/50 flex justify-between items-center"
                      onClick={() => toggleTestExpanded(test.id)}
                    >
                      {/* Left Side: Name & Status */}
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="font-semibold text-base text-white truncate"
                            title={test.name}
                          >
                            {test.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              test.isActive
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-600/30 text-gray-400"
                            }`}
                          >
                            {test.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <p
                          className="text-sm text-gray-400 truncate"
                          title={test.description}
                        >
                          {test.description || "No description."}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1 gap-3">
                          <span>Created: {test.createdAt}</span>
                          <span>{test.variants.length} variants</span>
                        </div>
                      </div>
                      {/* Right Side: Actions & Expander */}
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        {/* Toggle Active Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTestActive(test.id);
                          }}
                          className={`p-1.5 rounded-md transition-colors ${
                            test.isActive
                              ? "text-green-400 hover:bg-green-500/10"
                              : "text-gray-500 hover:bg-gray-700/50 hover:text-gray-300"
                          }`}
                          title={
                            test.isActive ? "Deactivate Test" : "Activate Test"
                          }
                        >
                          {test.isActive ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                        {/* Placeholder Edit Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); /* Implement edit logic */
                          }}
                          className="p-1.5 rounded-md text-gray-400 hover:bg-gray-700/50 hover:text-gray-100 cursor-not-allowed opacity-50"
                          title="Edit Test (Not Implemented)"
                        >
                          {" "}
                          <Edit size={16} />{" "}
                        </button>
                        {/* Placeholder Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); /* Implement delete logic */
                          }}
                          className="p-1.5 rounded-md text-gray-400 hover:bg-red-800/30 hover:text-red-400 cursor-not-allowed opacity-50"
                          title="Delete Test (Not Implemented)"
                        >
                          {" "}
                          <Trash2 size={16} />{" "}
                        </button>
                        {/* Expand/Collapse Chevron */}
                        <span className="p-1.5 text-gray-400">
                          {test.isExpanded ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Variant List */}
                    {test.isExpanded && (
                      <div className="border-t border-gray-700/50 p-3 md:p-4 bg-[#1A1A1A]/30 space-y-2">
                        {test.variants.map((variant, idx) => {
                          const rate = calculateRate(
                            variant.conversions,
                            variant.impressions
                          );
                          const isSelected =
                            selectedTest?.id === test.id &&
                            selectedTest?.selectedVariantIndex === idx;
                          return (
                            <div
                              key={variant.id}
                              className={`bg-[#222222] p-3 rounded-md flex flex-wrap justify-between items-center gap-2 hover:bg-[#2f2f2f] cursor-pointer border ${
                                isSelected
                                  ? "border-[#1DCD9F]/50"
                                  : "border-transparent"
                              }`}
                              onClick={() => handleSelectVariant(test, idx)}
                            >
                              {/* Variant Name & Control Badge */}
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-2.5 h-2.5 rounded-full ${
                                    idx === 0
                                      ? "bg-blue-500"
                                      : idx === 1
                                      ? "bg-[#1DCD9F]"
                                      : "bg-purple-500" // Example colors
                                  }`}
                                ></div>
                                <span className="font-medium text-sm text-gray-200">
                                  {variant.name}
                                </span>
                                {idx === 0 && (
                                  <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">
                                    Control
                                  </span>
                                )}
                              </div>
                              {/* Variant Stats */}
                              <div className="text-right text-sm space-x-4 flex items-center">
                                <span
                                  className="text-gray-400 text-xs"
                                  title="Conversions / Impressions"
                                >
                                  {variant.conversions.toLocaleString()}/
                                  {variant.impressions.toLocaleString()} Conv.
                                </span>
                                <span
                                  className={`font-medium ${
                                    test.conversionRate &&
                                    rate > test.conversionRate
                                      ? "text-green-400"
                                      : test.conversionRate &&
                                        rate < test.conversionRate
                                      ? "text-red-400"
                                      : "text-gray-300"
                                  }`}
                                  title="Conversion Rate"
                                >
                                  {(rate * 100).toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        {/* Placeholder Add Variant Button */}
                        <button className="w-full mt-2 bg-[#282828] hover:bg-[#333333] text-gray-400 hover:text-gray-300 p-2 rounded-lg text-sm flex items-center justify-center cursor-not-allowed opacity-60">
                          <Plus size={14} className="mr-1" /> Add Variant (Not
                          Implemented)
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* --- Selected Test/Variant Panel (Right) --- */}
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-4 md:p-5 shadow-lg lg:sticky lg:top-6 h-fit">
          {isLoading ? (
            // Loading Skeletons for Right Panel
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <SkeletonPulse className="h-6 w-48" />
                <div className="flex gap-1">
                  <SkeletonPulse className="h-7 w-7 rounded-md" />
                  <SkeletonPulse className="h-7 w-7 rounded-md" />
                </div>
              </div>
              <SkeletonPulse className="h-4 w-full" />
              <SkeletonPulse className="h-4 w-3/4 mb-4" />
              <SkeletonPulse className="h-5 w-24 mb-2" />
              <SkeletonPulse className="h-24 w-full rounded-lg" />
              <SkeletonPulse className="h-16 w-full rounded-lg" />
            </div>
          ) : selectedTest && currentSelectedVariant ? (
            // Selected Test Details
            <div>
              {/* Panel Header: Test Name & View Toggle */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-800">
                <h3
                  className="font-semibold text-base text-white truncate"
                  title={selectedTest.name}
                >
                  {selectedTest.name}
                </h3>
                <div className="flex bg-[#222222] p-0.5 rounded-md">
                  <button
                    className={`px-2 py-0.5 rounded text-xs transition-colors ${
                      !isViewingCode
                        ? "bg-[#383838] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setIsViewingCode(false)}
                    title="View Details & Performance"
                  >
                    {" "}
                    <BarChart2 size={14} className="inline mr-1" /> Details{" "}
                  </button>
                  <button
                    className={`px-2 py-0.5 rounded text-xs transition-colors ${
                      isViewingCode
                        ? "bg-[#383838] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setIsViewingCode(true)}
                    title="View Variant Code & Preview"
                  >
                    {" "}
                    <Code size={14} className="inline mr-1" /> Code{" "}
                  </button>
                </div>
              </div>

              {/* Conditional Content: Details or Code */}
              {isViewingCode ? (
                // --- Code View ---
                <div className="space-y-4">
                  {/* Variant Selector Tabs */}
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-300">
                      Variant Code & Preview
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTest.variants.map((variant, idx) => (
                        <button
                          key={variant.id}
                          className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
                            selectedTest.selectedVariantIndex === idx
                              ? "bg-[#1DCD9F] text-black font-semibold"
                              : "bg-[#282828] text-gray-300 hover:bg-[#333333]"
                          }`}
                          onClick={() => handleSelectVariantInDetails(idx)}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Code Block */}
                  <div className="bg-[#0D0D0D] p-3 rounded-lg border border-gray-700 relative">
                    <button
                      onClick={handleCopyCode}
                      className="absolute top-1.5 right-1.5 p-1 bg-[#2a2a2a] hover:bg-[#3f3f3f] text-gray-400 hover:text-white rounded transition-colors"
                      title={copiedCode ? "Copied!" : "Copy Code"}
                    >
                      {copiedCode ? (
                        <CheckCircle size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                    <pre className="text-sm font-mono overflow-auto max-h-60 text-gray-300 whitespace-pre-wrap break-words">
                      <code>
                        {currentSelectedVariant.code ||
                          "// No code provided for this variant"}
                      </code>
                    </pre>
                  </div>
                  {/* Preview Section */}
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-300">
                      Preview
                    </h4>
                    <div className="bg-white rounded p-3 border border-gray-300">
                      <div className="text-black text-sm">
                        {currentSelectedVariant.previewComponent ? (
                          <PreviewComponent
                            htmlContent={
                              currentSelectedVariant.previewComponent
                            }
                          />
                        ) : (
                          <p className="text-gray-500 text-center italic">
                            No preview available.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // --- Details View ---
                <div className="space-y-5">
                  {/* Description */}
                  <p className="text-sm text-gray-400">
                    {selectedTest.description || "No description provided."}
                  </p>

                  {/* Performance Bars */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-300">
                      Variant Performance
                    </h4>
                    <div className="space-y-3">
                      {selectedTest.variants.map((variant, idx) => {
                        const rate = calculateRate(
                          variant.conversions,
                          variant.impressions
                        );
                        const baseRate = selectedTest.conversionRate ?? 0; // Use stored base rate
                        const improvement =
                          idx === 0 || baseRate === 0
                            ? null
                            : ((rate - baseRate) / baseRate) * 100;
                        const maxRate = Math.max(
                          ...selectedTest.variants.map((v) =>
                            calculateRate(v.conversions, v.impressions)
                          )
                        );
                        const barWidth =
                          maxRate > 0 ? (rate / maxRate) * 100 : 0;
                        const variantColorClass =
                          idx === 0
                            ? "bg-blue-500"
                            : idx === 1
                            ? "bg-[#1DCD9F]"
                            : "bg-purple-500"; // Consistent colors

                        return (
                          <div key={variant.id}>
                            <div className="flex justify-between items-center text-sm mb-1">
                              <div className="flex items-center">
                                <div
                                  className={`w-2 h-2 rounded-full mr-1.5 ${variantColorClass}`}
                                ></div>
                                <span className="text-gray-200">
                                  {variant.name}
                                </span>
                                {idx === 0 && (
                                  <span className="ml-1.5 text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">
                                    Ctrl
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-200">
                                  {(rate * 100).toFixed(2)}%
                                </span>
                                {improvement !== null && (
                                  <span
                                    className={`text-xs font-medium ${
                                      improvement >= 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    ({improvement >= 0 ? "+" : ""}
                                    {improvement.toFixed(1)}%)
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="w-full bg-[#2a2a2a] rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${variantColorClass}`}
                                style={{ width: `${barWidth}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Overall Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#222222] p-3 rounded-lg border border-gray-700/50">
                      <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                        Total Impressions
                      </div>
                      <div className="text-xl font-bold text-white">
                        {selectedTest.variants
                          .reduce((sum, v) => sum + v.impressions, 0)
                          .toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-[#222222] p-3 rounded-lg border border-gray-700/50">
                      <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                        Total Conversions
                      </div>
                      <div className="text-xl font-bold text-white">
                        {selectedTest.variants
                          .reduce((sum, v) => sum + v.conversions, 0)
                          .toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="text-xs text-gray-500 border-t border-gray-800 pt-3 space-y-0.5">
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span>{selectedTest.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>{selectedTest.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Empty State for Right Panel
            <div className="text-center py-16 text-gray-600">
              <Layers size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm">
                Select a variant from a test on the left
              </p>
              <p className="text-sm">
                to view its details, code, and preview here.
              </p>
              <button className="bg-[#1DCD9F] hover:bg-[#19B18A] text-black px-3 py-1 rounded text-sm font-semibold mt-4 inline-flex items-center">
                <Plus size={14} className="mr-1" /> Create New Test
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Implementation Guide Panel (Static Bottom Section) --- */}
      <div className="bg-[#151515] border border-gray-800 rounded-xl p-4 md:p-5 mt-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">
          SDK Implementation Guide
        </h2>
        <div className="bg-[#1F1F1F] p-4 rounded-lg border border-gray-700/50 space-y-5">
          {/* Introduction */}
          <div>
            <h3 className="text-base font-medium text-[#1DCD9F] mb-1">
              Super Simple A/B Testing SDK
            </h3>
            <p className="text-sm text-gray-300">
              Integrate A/B testing with just a few lines of code.
            </p>
          </div>

          {/* Installation */}
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-200">
              1. Installation
            </h4>
            <div className="bg-[#0D0D0D] p-3 rounded text-sm font-mono border border-gray-700">
              <code className="text-gray-300">
                npm install simple-abtest-sdk
              </code>
            </div>
          </div>

          {/* Initialization */}
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-200">
              2. Initialize SDK
            </h4>
            <p className="text-xs text-gray-400 mb-1.5">
              Add this once at your app's entry point (e.g., App.jsx).
            </p>
            <div className="bg-[#0D0D0D] p-3 rounded text-sm font-mono border border-gray-700">
              <pre className="text-gray-300 whitespace-pre-wrap break-words">
                <code>
                  {`import ABTest from 'simple-abtest-sdk';

ABTest.init({
  apiKey: 'YOUR_API_KEY',  // Get from dashboard
  appId: 'YOUR_APP_ID'     // Get from dashboard
});`}
                </code>
              </pre>
            </div>
          </div>

          {/* Create Test */}
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-200">
              3. Create Tests
            </h4>
            <p className="text-xs text-gray-400 mb-1.5">
              Use `createTest` in your components to define variants.
            </p>
            <div className="bg-[#0D0D0D] p-3 rounded text-sm font-mono border border-gray-700">
              <pre className="text-gray-300 whitespace-pre-wrap break-words">
                <code>
                  {`import { createTest } from 'simple-abtest-sdk';

function ProductPage() {
  const buyButton = createTest('buy-button-test', [
    { id: 'blue', component: <BlueButton /> }, // Control
    { id: 'red', component: <RedButton /> },
    { id: 'green', component: <GreenButton /> },
  ]);

  return (
    <div>
      <h1>Product</h1>
      {buyButton} {/* Renders assigned variant */}
    </div>
  );
}`}
                </code>
              </pre>
            </div>
          </div>

          {/* Track Conversions */}
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-200">
              4. Track Conversions
            </h4>
            <p className="text-xs text-gray-400 mb-1.5">
              Use `withConversion` for inline tracking or
              `ABTest.trackConversion` manually.
            </p>
            <div className="bg-[#0D0D0D] p-3 rounded text-sm font-mono border border-gray-700 mb-2">
              <pre className="text-gray-300 whitespace-pre-wrap break-words">
                <code>
                  {`// Inline with withConversion
import { withConversion } from 'simple-abtest-sdk';

<button
  onClick={withConversion('test-id', 'click_event', { custom: 'data' })}
>
  Track Click
</button>`}
                </code>
              </pre>
            </div>
            <div className="bg-[#0D0D0D] p-3 rounded text-sm font-mono border border-gray-700">
              <pre className="text-gray-300 whitespace-pre-wrap break-words">
                <code>
                  {`// Manual tracking
import ABTest from 'simple-abtest-sdk';

function handlePurchase() {
  // ... process purchase ...
  ABTest.trackConversion('test-id', 'purchase', { amount: 99 });
}`}
                </code>
              </pre>
            </div>
          </div>

          {/* Custom User ID */}
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-200">
              5. Custom User IDs (Recommended)
            </h4>
            <p className="text-xs text-gray-400 mb-1.5">
              Set a user ID in localStorage for consistent assignment.
            </p>
            <div className="bg-[#0D0D0D] p-3 rounded text-sm font-mono border border-gray-700">
              <pre className="text-gray-300 whitespace-pre-wrap break-words">
                <code>
                  {`function onUserLogin(user) {
  localStorage.setItem('abtest_userId', user.id);
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Demo Data ---
const demoTestData: Omit<
  Test,
  "isExpanded" | "selectedVariantIndex" | "conversionRate"
>[] = [
  {
    id: "hero-layout-test",
    name: "Homepage Hero Section Layout",
    description:
      "Testing different hero layouts to optimize click-through rate on the main CTA.",
    isActive: true,
    createdAt: "May 1, 2024",
    lastUpdated: "May 10, 2024",
    variants: [
      {
        id: "control-left-img",
        name: "Image Left (Control)",
        impressions: 15102,
        conversions: 680, // Approx 4.5%
        code: `<div className="flex items-center gap-8 p-4">
  <img src="/placeholder-image.svg" alt="Feature" className="w-1/3 rounded" />
  <div className="flex-1">
    <h2 className="text-2xl font-bold mb-2">Headline Here</h2>
    <p className="text-gray-600 mb-4">Sub-description explaining the value proposition.</p>
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Get Started
    </button>
  </div>
</div>`,
        previewComponent: `<div style="display: flex; align-items: center; gap: 1rem; text-align: left; font-family: sans-serif;">
            <div style="width: 30%; height: 60px; background: #ccc; border-radius: 4px; display:flex; align-items:center; justify-content: center; color:#888; font-size: 10px;">IMG</div>
            <div style="flex: 1;">
              <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">Headline Here</h4>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #555;">Sub-description explaining the value.</p>
              <button style="background: #2563EB; color: white; border: none; padding: 4px 8px; font-size: 10px; border-radius: 4px;">Get Started</button>
            </div>
          </div>`,
      },
      {
        id: "variant-right-img",
        name: "Image Right",
        impressions: 14985,
        conversions: 750, // Approx 5.0%
        code: `<div className="flex items-center gap-8 p-4">
  <div className="flex-1">
    <h2 className="text-2xl font-bold mb-2">Headline Here</h2>
    <p className="text-gray-600 mb-4">Sub-description explaining the value proposition.</p>
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      Get Started Now
    </button>
  </div>
  <img src="/placeholder-image.svg" alt="Feature" className="w-1/3 rounded" />
</div>`,
        previewComponent: `<div style="display: flex; align-items: center; gap: 1rem; text-align: left; font-family: sans-serif;">
            <div style="flex: 1;">
              <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">Headline Here</h4>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #555;">Sub-description explaining the value.</p>
              <button style="background: #10B981; color: white; border: none; padding: 4px 8px; font-size: 10px; border-radius: 4px;">Get Started Now</button>
            </div>
             <div style="width: 30%; height: 60px; background: #ccc; border-radius: 4px; display:flex; align-items:center; justify-content: center; color:#888; font-size: 10px;">IMG</div>
          </div>`,
      },
    ],
  },
  {
    id: "cta-button-test",
    name: "Add to Cart Button Color",
    description:
      "Testing button color impact on add-to-cart clicks on product pages.",
    isActive: true,
    createdAt: "April 25, 2024",
    lastUpdated: "May 8, 2024",
    variants: [
      {
        id: "control-blue",
        name: "Blue Button (Control)",
        impressions: 9850,
        conversions: 1182, // 12.0%
        code: `<button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 w-full">
  Add to Cart
</button>`,
        previewComponent: `<button style="background: #2563EB; color: white; border: none; padding: 6px 12px; font-size: 12px; border-radius: 4px; width: 100%; font-weight: 600;">Add to Cart</button>`,
      },
      {
        id: "variant-green",
        name: "Green Button",
        impressions: 9910,
        conversions: 1298, // 13.1%
        code: `<button className="bg-[#1DCD9F] text-black px-6 py-2 rounded font-semibold hover:bg-[#19B18A] w-full">
  Add to Cart
</button>`,
        previewComponent: `<button style="background: #1DCD9F; color: black; border: none; padding: 6px 12px; font-size: 12px; border-radius: 4px; width: 100%; font-weight: 600;">Add to Cart</button>`,
      },
      {
        id: "variant-orange",
        name: "Orange Button",
        impressions: 9885,
        conversions: 1255, // 12.7%
        code: `<button className="bg-orange-500 text-white px-6 py-2 rounded font-semibold hover:bg-orange-600 w-full">
  Add to Cart
</button>`,
        previewComponent: `<button style="background: #F97316; color: white; border: none; padding: 6px 12px; font-size: 12px; border-radius: 4px; width: 100%; font-weight: 600;">Add to Cart</button>`,
      },
    ],
  },
  {
    id: "inactive-pricing-test",
    name: "Pricing Page Layout",
    description: "Comparing a 3-column vs. 2-column pricing table.",
    isActive: false, // Example of an inactive test
    createdAt: "March 10, 2024",
    lastUpdated: "April 15, 2024",
    variants: [
      {
        id: "control-3-col",
        name: "3 Columns (Control)",
        impressions: 25000,
        conversions: 500, // 2.0%
        code: `// JSX for 3-column layout... \n<div className="grid grid-cols-3 gap-4">...</div>`,
        previewComponent: `<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-family: sans-serif; font-size: 10px;">
            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; text-align: center;">Plan A</div>
            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; text-align: center;">Plan B</div>
            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; text-align: center;">Plan C</div>
          </div>`,
      },
      {
        id: "variant-2-col",
        name: "2 Columns",
        impressions: 24800,
        conversions: 545, // 2.2%
        code: `// JSX for 2-column layout...\n<div className="grid grid-cols-2 gap-4">...</div>`,
        previewComponent: `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: sans-serif; font-size: 10px;">
            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; text-align: center;">Plan A</div>
            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; text-align: center;">Plan B</div>
          </div>`,
      },
    ],
  },
];

export default ABTestingDashboard;
