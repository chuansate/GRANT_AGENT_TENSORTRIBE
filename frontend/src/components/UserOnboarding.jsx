import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react"; // Make sure this is installed: `lucide-react`

export default function UserOnboarding({
  currentStep,
  totalSteps = 6,
  question,
  options,
  onNext,
}) {
  const navigate = useNavigate();
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Top Nav */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-[#3B4A74] hover:text-[#1E2A47] transition-colors"
          type="button"
          aria-label="Go back to ROI calculator"
        >
          <ChevronLeft className="h-6 w-6 mr-2 text-[#3B4A74]" />
          <span className="text-lg font-medium">Go back</span>
        </button>
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Question and Options */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-indigo-900 mb-6">
          {question}
        </h2>
        <div className="space-y-4 w-full max-w-md">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onNext(option)}
              className="w-full py-3 px-4 border border-indigo-300 rounded-md hover:bg-indigo-50 transition text-indigo-900 text-base text-left"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 pb-14">
        <button
          onClick={() => onNext(null)}
          className="w-full bg-indigo-700 text-white py-3 rounded-md font-semibold hover:bg-indigo-800 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
