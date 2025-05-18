import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const bestGrantEntries = [
  [
    { label: "Best Grant Match", value: "MDG - Market Dev Grant" },
    { label: "Claimable Amount", value: "RM42,500 (from RM90,000)" },
    { label: "ROI", value: "61%" },
  ],
  [
    { label: "Eligibility", value: "100% Match" },
    { label: "Focus Area", value: "Export, Exhibitions" },
    { label: "Status", value: "Open, apply by 30 June" },
  ],
];

const grantRows = [
  {
    grant: "MDG",
    maxClaimable: "RM300,000",
    match: "70%",
    yourClaim: "42,500",
    roi: "61%",
    status: "Eligible",
    action: "[View Details]",
  },
  {
    grant: "MSME Digital",
    maxClaimable: "RM5,000",
    match: "50%",
    yourClaim: "RM3,000",
    roi: "12%",
    status: "Partial",
    action: "[Improve Match]",
  },
  {
    grant: "SAG",
    maxClaimable: "RM200,000",
    match: "50%",
    yourClaim: "RM15,000",
    roi: "21%",
    status: "Ineligible",
    action: "[See Why?]",
  },
];

export default function GrantROIResult() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleApplyNow = () => {
    navigate("/grant-application-assistant");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 w-full px-6 py-8 max-w-[1600px] mx-auto">
      {/* Go Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackClick}
          className="flex items-center text-sm text-[#3B4A74] hover:text-[#1E2A47] cursor-pointer transition-colors"
          type="button"
          aria-label="Go back to ROI calculator"
        >
          <ChevronLeft className="h-8 w-8 mr-2 text-[#3B4A74]" />
          <span className="text-[#3B4A74] text-xl font-semibold">Back</span>
        </button>
      </div>

      {/* Title and Description */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900">Your Grant ROI Result</h1>
        <p className="text-indigo-700 mt-3 text-lg">
          Identify high-ROI grants based on your budget
        </p>
      </div>

      {/* Shared Container for Alignment */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Best Fit Grant Header */}
        <h2 className="text-2xl font-semibold mb-6 text-indigo-900">
          Best Fit Grant
        </h2>

        {/* Best Grant Card */}
        <div className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-md p-10 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 border border-indigo-100">          {bestGrantEntries.flat().map((entry, idx) => (
            <div key={idx} className="text-lg font-semibold text-indigo-800">
              <span className="font-extrabold">{entry.label}:</span> {entry.value}
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 pt-10 justify-center md:justify-start">
            <button
              onClick={handleApplyNow}
              className="bg-indigo-600 text-white px-8 py-4 rounded-md shadow-md hover:bg-indigo-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              aria-label="Apply for the best fit grant"
            >
              Apply Now
            </button>
            <button
              className="bg-gray-200 text-gray-900 px-8 py-4 rounded-md shadow-md hover:bg-gray-300 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-400"
              aria-label="Get more info on the best fit grant"
            >
              More Info
            </button>
          </div>
        </div>

        {/* Grant Comparison Table */}
        <div className="mt-20 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-900">Grant Comparison Table</h2>
          <div className="overflow-x-auto rounded-md border border-black shadow-md bg-white">
            <table className="min-w-full text-base text-left border border-black">
             <thead className="bg-indigo-900 text-white border-b border-black">
                <tr>
                  <th className="px-8 py-5 whitespace-nowrap font-semibold border-r border-black">Grant</th>
                  <th className="px-8 py-5 whitespace-nowrap font-semibold border-r border-black">Max Claimable</th>
                  <th className="px-8 py-5 whitespace-nowrap font-semibold border-r border-black">Match %</th>
                  <th className="px-8 py-5 whitespace-nowrap font-semibold border-r border-black">Your Claim</th>
                  <th className="px-8 py-5 whitespace-nowrap font-semibold border-r border-black">ROI</th>
                  <th className="px-8 py-5 whitespace-nowrap font-semibold border-r border-black">Status</th>
                  <th className="px-8 py-5 whitespace-nowrap font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white text-black">
                {grantRows.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors border-t border-black"
                  >
                    <td className="px-8 py-5 whitespace-nowrap font-medium border-r border-black">{row.grant}</td>
                    <td className="px-8 py-5 whitespace-nowrap border-r border-black">{row.maxClaimable}</td>
                    <td className="px-8 py-5 whitespace-nowrap border-r border-black">{row.match}</td>
                    <td className="px-8 py-5 whitespace-nowrap border-r border-black">{row.yourClaim}</td>
                    <td className="px-8 py-5 whitespace-nowrap border-r border-black">{row.roi}</td>
                    <td className="px-8 py-5 whitespace-nowrap border-r border-black">{row.status}</td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <button className="text-black hover:underline transition-colors">
                        {row.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
