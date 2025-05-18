import React from "react";
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Lightbulb,
  RefreshCcw,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IneligibilityResult() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTryAnotherGrantClick = () => {
    navigate("/eligibility-checker"); // Navigate to the eligibility checker
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 w-full px-6 py-8 flex items-start justify-center pt-16">
      <div className="text-center max-w-[1600px] w-full">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-sm text-[#742c2c] hover:text-[#511f1f] cursor-pointer transition-colors"
            type="button"
            aria-label="Go back to ROI calculator"
          >
            <ChevronLeft className="h-8 w-8 mr-2 text-[#742c2c]" />
            <span className="text-xl font-semibold">Back</span>
          </button>
        </div>

        {/* Warning Emoji */}
        <div className="text-5xl mb-4">⚠️</div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 mb-2">
          Not Eligible for CIP
        </h1>

        {/* Criteria List */}
        <div className="text-left text-red-800 text-md sm:text-lg mb-6 max-w-md mx-auto space-y-3">
          <p className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Your company type is not supported (Sole Prop)
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Revenue requirement met
          </p>
          <p className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Not registered with MATRADE
          </p>
        </div>

        {/* Tip */}
        <p className="text-yellow-700 text-md sm:text-lg mb-8 flex items-center justify-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Tip: You can still apply for{" "}
          <span className="font-semibold text-yellow-800">
            MSME Digital Grant
          </span>
        </p>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-all"
            onClick={handleTryAnotherGrantClick}
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try Another Grant
          </button>
        </div>
      </div>
    </div>
  );
}
