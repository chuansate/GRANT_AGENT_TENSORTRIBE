import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function EligibilityCheck() {
  const navigate = useNavigate();

  const [selectedGrant, setSelectedGrant] = useState("");

  const [form, setForm] = useState({
    companyType: "",
    registeredWithSSM: false,
    registeredWithMatrade: false,
    years: "",
    revenue: "",
    activity: "",
    targetMarket: "",
    sector: "",
    notReceivedBefore: false,
    notBlacklisted: false,
    hasProof: false,
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

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

      {/* Header */}
      <header className="flex flex-col justify-center items-center text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-1">
          Grant Eligibility Checker
        </h1>
        <p className="text-indigo-700 text-lg sm:text-xl">
          Check if you're eligible in under 2 minutes
        </p>
      </header>

      {/* Grant Selection */}
      <div className="bg-white shadow-md rounded-md p-6 mb-8">
        <label className="block font-medium text-indigo-800 mb-2 text-lg">
          Select a Grant
        </label>
        <select
          value={selectedGrant}
          onChange={(e) => setSelectedGrant(e.target.value)}
          className="w-full p-3 border border-indigo-300 rounded-md"
        >
          <option value="">Choose a grant</option>
          <option value="msme">MSME Digital Grant</option>
          <option value="cip">CIP Spark</option>
          <option value="i4wrdfund">Industry4WRD Intervention Fund</option>
          <option value="cup">
            Program Geran Pemadanan Change Upgrade Product (CUP)
          </option>
        </select>
      </div>

      {/* Section 1 */}
      <div className="bg-white shadow-md rounded-md p-6 mb-8">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">1️. About Your Business</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Type */}
          <div>
            <label className="block font-medium text-indigo-800 mb-2">Company Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="companyType"
                  value="sole"
                  checked={form.companyType === "sole"}
                  onChange={() => handleChange("companyType", "sole")}
                />
                Sole Prop
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="companyType"
                  value="sdnbhd"
                  checked={form.companyType === "sdnbhd"}
                  onChange={() => handleChange("companyType", "sdnbhd")}
                />
                Sdn Bhd
              </label>
            </div>
          </div>

          {/* Registered With */}
          <div>
            <label className="block font-medium text-indigo-800 mb-2">Registered With</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.registeredWithSSM}
                  onChange={() =>
                    handleChange("registeredWithSSM", !form.registeredWithSSM)
                  }
                />
                SSM
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.registeredWithMatrade}
                  onChange={() =>
                    handleChange("registeredWithMatrade", !form.registeredWithMatrade)
                  }
                />
                MATRADE
              </label>
            </div>
          </div>

          {/* Years in Operation */}
          <div>
            <label className="block font-medium text-indigo-800 mb-2">
              Years in Operation
            </label>
            <input
              type="number"
              min="0"
              value={form.years}
              onChange={(e) => handleChange("years", e.target.value)}
              className="w-full p-3 border border-indigo-300 rounded-md"
            />
          </div>

          {/* Revenue */}
          <div>
            <label className="block font-medium text-indigo-800 mb-2">
              Annual Revenue (RM)
            </label>
            <input
              type="number"
              min="0"
              value={form.revenue}
              onChange={(e) => handleChange("revenue", e.target.value)}
              className="w-full p-3 border border-indigo-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white shadow-md rounded-md p-6 mb-8">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">2️. Your Grant Activity</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Activity */}
          <div>
            <label className="block font-medium text-indigo-800 mb-2">Main Activity</label>
            <select
              className="w-full p-3 border border-indigo-300 rounded-md"
              value={form.activity}
              onChange={(e) => handleChange("activity", e.target.value)}
            >
              <option value="">Select an activity</option>
              <option value="event">Event / Trade Show</option>
              <option value="marketing">Marketing & Promotion</option>
              <option value="tech">Tech / Digitalization</option>
            </select>
          </div>

          {/* Target Market */}
          <div>
            <label className="block font-medium text-indigo-800 mb-2">Target Market</label>
            <select
              className="w-full p-3 border border-indigo-300 rounded-md"
              value={form.targetMarket}
              onChange={(e) => handleChange("targetMarket", e.target.value)}
            >
              <option value="">Select market</option>
              <option value="local">Local</option>
              <option value="export">Export</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Sector */}
          <div className="md:col-span-2">
            <label className="block font-medium text-indigo-800 mb-2">Business Sector</label>
            <select
              className="w-full p-3 border border-indigo-300 rounded-md"
              value={form.sector}
              onChange={(e) => handleChange("sector", e.target.value)}
            >
              <option value="">Select sector</option>
              <option value="fnb">F&B</option>
              <option value="tech">Tech</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-white shadow-md rounded-md p-6 mb-10">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">3️. Compliance / Additional Criteria</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-indigo-800 font-medium">
            <input
              type="checkbox"
              checked={form.notReceivedBefore}
              onChange={() =>
                handleChange("notReceivedBefore", !form.notReceivedBefore)
              }
            />
            I have not received this grant in the past 3 years
          </label>
          <label className="flex items-center gap-3 text-indigo-800 font-medium">
            <input
              type="checkbox"
              checked={form.notBlacklisted}
              onChange={() =>
                handleChange("notBlacklisted", !form.notBlacklisted)
              }
            />
            I’m not blacklisted or under investigation
          </label>
          <label className="flex items-center gap-3 text-indigo-800 font-medium">
            <input
              type="checkbox"
              checked={form.hasProof}
              onChange={() =>
                handleChange("hasProof", !form.hasProof)
              }
            />
            I have proof of past activities (if claimed)
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md py-4 shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        type="button"
        onClick={() => {
          console.log("Eligibility Check:", form);
          if (selectedGrant === "cip") {
            navigate("/ineligibility-result", { state: { form, selectedGrant } });
          } else {
            navigate("/eligibility-result", { state: { form, selectedGrant } });
          }
        }}
      >
        Check Eligibility
      </button>
    </div>
  );
}
