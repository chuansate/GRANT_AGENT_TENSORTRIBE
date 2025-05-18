import React from "react";
import { CheckCircle, ClipboardList, Paperclip, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EligibilityResult() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 w-full px-6 py-8 flex items-start justify-center pt-16">
      <div className="text-center max-w-[1600px] w-full">
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

        {/* Celebration Emoji */}
        <div className="text-5xl mb-4">🎉</div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-2">
          You're Eligible for MSME!
        </h1>

        {/* Subtext */}
        <p className="text-green-800 text-lg sm:text-xl mb-6 flex items-center justify-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          All core criteria matched
        </p>

        {/* Next Steps */}
        <p className="text-gray-700 text-md sm:text-lg mb-8">
          🧾 Next: Prepare your documents
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-all"
            onClick={() => {
              navigate("/grant-checklist");
            }}
          >
            <ClipboardList className="w-5 h-5 mr-2" />
            Generate Checklist
          </button>

          <button
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-700 font-semibold rounded-md border border-green-400 shadow-sm hover:bg-green-50 transition-all"
            onClick={() => {
              navigate("/grant-details");
            }}
          >
            <Paperclip className="w-5 h-5 mr-2" />
            View Grant Details
          </button>
        </div>
      </div>
    </div>
  );
}
