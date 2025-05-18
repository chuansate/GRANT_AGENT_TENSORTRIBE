import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function GrantDetails() {
  const navigate = useNavigate();

    const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 w-full px-6 py-8 max-w-[1600px] mx-auto">
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
      
            <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900">MSME</h1>
        <p className="text-indigo-700 mt-3 text-lg">
          Boost growth with funding tailored to your business needs
        </p>
      </div>
      

      {/* Content Card */}
      <div className="bg-white rounded-2xl shadow-lg p-10 mt-8">
        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-indigo-800">
          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Backed by:</h3>
            <p className="text-indigo-700">Registered Marketing Organisation</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Who we are looking for:</h3>
            <p className="text-indigo-700">Willing to join immediately</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Business Size:</h3>
            <p className="text-indigo-700">Small</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Business Age:</h3>
            <p className="text-indigo-700">&lt;1 year</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Other Details:</h3>
            <p className="text-indigo-700">—</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Status:</h3>
            <p className="text-green-600 font-semibold">Open</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Type:</h3>
            <p className="text-indigo-700">General</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Sector:</h3>
            <p className="text-indigo-700">Export, Exhibitions</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Deadline:</h3>
            <p className="text-indigo-700">30 June 2025</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Funding:</h3>
            <p className="text-indigo-700">RM42,500 (from RM90,000)</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-indigo-900">Funding Purpose:</h3>
            <p className="text-indigo-700">Marketing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
