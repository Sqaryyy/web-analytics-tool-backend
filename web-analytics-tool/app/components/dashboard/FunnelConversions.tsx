"use client";
import React, { useState } from "react";
import { ArrowDown, Plus } from "lucide-react";

interface FunnelStep {
  id: string; // Add unique id for stable key prop
  name: string;
  url: string;
  conversions: number;
  visitors: number;
}

// Helper to generate simple unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

const FunnelConversions = () => {
  const [funnelName, setFunnelName] = useState("Sample Acquisition Funnel");
  const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>([
    {
      id: generateId(),
      name: "Homepage Visit",
      url: "/",
      conversions: 3800,
      visitors: 4000,
    },
    {
      id: generateId(),
      name: "View Pricing",
      url: "/pricing",
      conversions: 1500,
      visitors: 2000,
    },
    {
      id: generateId(),
      name: "Initiate Sign Up",
      url: "/signup",
      conversions: 800,
      visitors: 1000,
    },
    {
      id: generateId(),
      name: "Complete Sign Up",
      url: "/signup/complete",
      conversions: 500,
      visitors: 800,
    },
    // Added a zero step to match the image example exactly
    {
      id: generateId(),
      name: "N...",
      url: "/next",
      conversions: 0,
      visitors: 0,
    },
  ]);

  const addFunnelStep = () => {
    setFunnelSteps([
      ...funnelSteps,
      {
        id: generateId(),
        name: "New Step",
        url: "",
        conversions: 0,
        visitors: 0,
      },
    ]);
  };

  const handleStepChange = (
    index: number,
    field: keyof Omit<FunnelStep, "id">, // Exclude 'id' from editable fields
    value: string | number
  ) => {
    const newFunnelSteps = [...funnelSteps];
    // Type assertion needed here because field type is broad
    (newFunnelSteps[index][field] as FunnelStep[keyof FunnelStep]) = value;
    setFunnelSteps(newFunnelSteps);
  };

  const removeFunnelStep = (idToRemove: string) => {
    setFunnelSteps(funnelSteps.filter((step) => step.id !== idToRemove));
  };

  // --- Visualization Logic ---
  const maxFunnelValue =
    funnelSteps.length > 0 ? funnelSteps[0].conversions : 0;
  const safeMaxFunnelValue = maxFunnelValue > 0 ? maxFunnelValue : 1;

  // Determine maximum width percentage the first bar can take within its container.
  // Setting this to 100 means the first bar will fill the horizontal space allocated
  // by the `items-start` alignment container, effectively acting as the baseline width.
  const maxBarWidthPercentage = 100; // Let the first bar define max width in the aligned container

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8 bg-[#0a0a0a]">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Funnel Conversions
      </h2>
      {/* Funnel Creation/Editing Section (kept as is) */}
      <div className="bg-[#111111] p-5 rounded-lg shadow-md space-y-5 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-gray-200 border-b border-gray-700 pb-3 mb-4">
          Configure Funnel
        </h3>
        <input
          type="text"
          placeholder="Funnel Name (e.g., Sales Funnel)"
          className="w-full p-3 rounded-md bg-[#222222] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1DCD9F]"
          value={funnelName}
          onChange={(e) => setFunnelName(e.target.value)}
        />

        {/* Steps List */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Funnel Steps:
          </label>
          {funnelSteps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 bg-[#1a1a1a] p-3 rounded"
            >
              <span className="text-gray-400 font-medium mr-2 hidden sm:inline">
                #{index + 1}
              </span>
              <input
                type="text"
                placeholder="Step Name"
                className="flex-grow p-2 rounded bg-[#282828] text-white focus:outline-none focus:ring-1 focus:ring-[#1DCD9F] w-full sm:w-auto"
                value={step.name}
                onChange={(e) =>
                  handleStepChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="URL (optional)"
                className="flex-grow p-2 rounded bg-[#282828] text-white focus:outline-none focus:ring-1 focus:ring-[#1DCD9F] w-full sm:w-auto"
                value={step.url}
                onChange={(e) => handleStepChange(index, "url", e.target.value)}
              />
              <input
                type="number"
                placeholder="Conversions"
                className="p-2 rounded bg-[#282828] text-white focus:outline-none focus:ring-1 focus:ring-[#1DCD9F] w-full sm:w-24"
                value={step.conversions}
                min="0"
                onChange={(e) =>
                  handleStepChange(
                    index,
                    "conversions",
                    Math.max(0, Number(e.target.value))
                  )
                } // Ensure non-negative
              />
              <input
                type="number"
                placeholder="Visitors"
                className="p-2 rounded bg-[#282828] text-white focus:outline-none focus:ring-1 focus:ring-[#1DCD9F] w-full sm:w-24"
                value={step.visitors}
                min="0"
                onChange={(e) =>
                  handleStepChange(
                    index,
                    "visitors",
                    Math.max(0, Number(e.target.value))
                  )
                } // Ensure non-negative
              />
              <button
                onClick={() => removeFunnelStep(step.id)}
                className="text-red-500 hover:text-red-400 p-1 rounded ml-auto sm:ml-2"
                aria-label="Remove Step"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          className="flex items-center text-[#1DCD9F] hover:text-[#55E8BE] transition-colors duration-200 px-3 py-2 rounded hover:bg-gray-700/50"
          onClick={addFunnelStep}
        >
          <Plus className="mr-2" size={18} />
          Add Step
        </button>
      </div>

      {/* Funnel Visualization Section --- MODIFIED BELOW --- */}
      <div className="bg-[#111111] p-5 rounded-lg shadow-md border border-gray-700/50">
        <h3 className="text-xl font-semibold text-gray-200 mb-6 border-b border-gray-700 pb-3">
          Funnel Visualization: {funnelName || "(Unnamed Funnel)"}
        </h3>

        {funnelSteps.length === 0 ? (
          <p className="text-center text-gray-500">
            Add steps above to visualize the funnel.
          </p>
        ) : maxFunnelValue === 0 ? (
          <p className="text-center text-gray-500">
            Enter conversion data in the first step to visualize the funnel.
          </p>
        ) : (
          // Use items-start to align all steps to the left edge of this container
          <div className="flex flex-col items-start space-y-0">
            {funnelSteps.map((step, index) => {
              const widthPercentage =
                (step.conversions / safeMaxFunnelValue) * maxBarWidthPercentage;
              const prevConversions =
                index > 0 ? funnelSteps[index - 1].conversions : null;
              const conversionRate =
                prevConversions !== null && prevConversions > 0
                  ? (step.conversions / prevConversions) * 100
                  : null;
              const overallConversionRate =
                (step.conversions / safeMaxFunnelValue) * 100;

              // Ensure a minimum visible width, especially for 0 conversions
              // Calculate based on pixels first then convert to % relative to maxBarWidthPercentage if needed
              // Or just use a small fixed percentage like 1% or 2%
              const minWidthPercentage = step.conversions > 0 ? 2 : 1; // Small % width for zero/very small steps
              const displayWidth = Math.max(
                widthPercentage,
                minWidthPercentage
              );

              return (
                <React.Fragment key={step.id}>
                  {/* Arrow and Conversion Rate (if not the first step) */}
                  {index > 0 && (
                    // Align this container to the left, give it the width of the bar below it, and center its content
                    <div
                      className="flex flex-col items-center my-2 text-center" // Center arrow & text inside
                      style={{ width: `${displayWidth}%`, marginLeft: "0" }} // Set width, ensure no extra margin
                    >
                      <ArrowDown className="text-gray-500" size={24} />
                      {conversionRate !== null && (
                        <span className="mt-1 text-xs font-medium text-[#1DCD9F] bg-[#1DCD9F]/10 px-1.5 py-0.5 rounded inline-block">
                          {conversionRate.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  )}

                  {/* Step Row: Contains Bar and Details Side-by-Side. Parent `items-start` handles left alignment. */}
                  <div className="flex items-center w-full space-x-4 my-1">
                    {" "}
                    {/* Added w-full here */}
                    {/* Funnel Step Bar (Visual Only) */}
                    <div
                      className={`bg-gradient-to-r from-[#1DCD9F] to-[#55E8BE] rounded-md shadow-lg transition-all duration-500 ease-out ${
                        step.conversions === 0 ? "opacity-50" : ""
                      }`}
                      style={{
                        width: `${displayWidth}%`,
                        height: "40px", // Fixed height
                      }}
                      title={`${step.conversions.toLocaleString()} Conversions / ${step.visitors.toLocaleString()} Visitors`}
                    >
                      {/* Intentionally Empty */}
                    </div>
                    {/* Step Details (Text) */}
                    <div className="text-left text-white min-w-[150px] w-auto flex-shrink-0">
                      {" "}
                      {/* Added flex-shrink-0 prevent text squishing */}
                      <div className="font-bold text-sm md:text-base truncate">
                        {step.name}
                      </div>
                      <div className="text-xs md:text-sm font-medium text-gray-300">
                        {step.conversions.toLocaleString()}{" "}
                        <span className="text-gray-400">Conversions</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        ({overallConversionRate.toFixed(1)}% overall)
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FunnelConversions;
