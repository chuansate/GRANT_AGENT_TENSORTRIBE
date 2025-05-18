import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const expenses = {
  "Travel & Accommodation": [
    { id: "t1", name: "Flight Tickets", unit: "RM", tooltip: "Common for exhibitions" },
    { id: "t2", name: "Hotel Accommodation", unit: "RM" },
    { id: "t3", name: "Local Transport", unit: "RM" },
  ],
  "Event / Trade Show": [
    { id: "e1", name: "Booth Rental / Space Cost", unit: "RM", tooltip: "Matches MDG, TEG, TSS grants" },
    { id: "e2", name: "Booth Design & Construction", unit: "RM" },
    { id: "e3", name: "Registration / Participation Fees", unit: "RM" },
    { id: "e4", name: "Freight / Product Shipment", unit: "RM" },
  ],
  "Marketing & Promotion": [
    { id: "m1", name: "Digital Ads (Meta, Google, etc.)", unit: "RM" },
    { id: "m2", name: "E-commerce Platform Fees", unit: "RM", tooltip: "Shopee, Lazada, Amazon, etc." },
    { id: "m3", name: "Graphic Design / Creative Services", unit: "RM" },
    { id: "m4", name: "Agency Fees (Marketing, SEO, PR)", unit: "RM" },
  ],
  "Tech / Digitalization": [
    { id: "d1", name: "Software / SaaS Subscription", unit: "RM" },
    { id: "d2", name: "AI / Automation Tools", unit: "RM" },
    { id: "d3", name: "System Integration / Custom Dev", unit: "RM" },
    { id: "d4", name: "Hardware (Computers, POS, Devices)", unit: "RM" },
  ],
  "Training & Development": [
    { id: "tr1", name: "Course Fees / Workshop Charges", unit: "RM" },
    { id: "tr2", name: "Certification Programs", unit: "RM" },
    { id: "tr3", name: "Equipment for Training", unit: "RM" },
  ],
  "Certification & Compliance": [
    { id: "c1", name: "Halal / HACCP / ISO Certification Fees", unit: "RM" },
    { id: "c2", name: "Lab Testing Fees", unit: "RM" },
    { id: "c3", name: "Product Packaging / Labelling Redesign", unit: "RM" },
  ],
};
export default function ExpenseTable() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // State to track amount input for each expense item
  const [amounts, setAmounts] = useState({});

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleResultClick = () => {
    navigate("/roi-result");
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle input changes per item
  const handleAmountChange = (id, value) => {
    // sanitize value to number or 0 if empty/invalid
    const amount = value === "" ? "" : Number(value);
    setAmounts((prev) => ({
      ...prev,
      [id]: amount,
    }));
  };

  const selectedExpenses = selectedCategory ? expenses[selectedCategory] : [];

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
        <h1 className="text-4xl font-extrabold text-indigo-900">Make Every Ringgit Count</h1>
        <p className="text-indigo-700 mt-3 text-lg">
          Use your planned expenses to calculate your best grant return.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-900">
          Select Expenses Category
        </h2>
        <select
          id="category"
          className="w-full p-3 border border-indigo-300 rounded-md text-indigo-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedCategory}
          onChange={handleCategoryChange}
          aria-label="Select expense category"
        >
          <option value="">-- Choose a category --</option>
          {Object.keys(expenses).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {!selectedCategory ? (
          <p className="text-indigo-500 italic text-center mt-20">
            Please select a category to view expense items.
          </p>
        ) : (
          <div className="mt-20 w-full">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-900">{selectedCategory}</h2>

            <div className="overflow-x-auto rounded-md border border-black shadow-md bg-white">
              <table className="min-w-full text-base text-left border border-black">
                <thead className="bg-indigo-900 text-white border-b border-black font-semibold">
                  <tr>
                    <th className="px-8 py-5 whitespace-nowrap border-r border-black">Item</th>
                    <th className="px-8 py-5 whitespace-nowrap text-right">Amount (RM)</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-black">
                  {selectedExpenses.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-100 transition-colors border-t border-black"
                    >
                      <td className="px-8 py-5 whitespace-nowrap border-r border-black">{item.name}</td>
                      <td className="px-8 py-5 whitespace-nowrap text-right font-semibold">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          aria-label={`Amount for ${item.name}`}
                          value={amounts[item.id] ?? ""}
                          onChange={(e) => handleAmountChange(item.id, e.target.value)}
                          className="w-full max-w-[120px] text-right border border-indigo-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md py-4 shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              aria-label="Find the best-fit grant"
              onClick={handleResultClick}
              type="button"
            >
              Find the Best-Fit Grant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
