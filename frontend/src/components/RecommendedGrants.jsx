import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  Filter,
  Star,
  Info,
  Plus,
  ArrowLeft,
  ArrowRight,
  X,
  CheckSquare,
  Square,
  Layers,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const filtersDefault = {
  size: "",
  age: "",
  sector: "",
  purpose: "",
  status: "",
  agency: "",
};

const sectors = ["F&B", "Manufacturing", "Services", "Retail"];
const purposes = ["Marketing", "Export", "Equipment", "Training", "Digitalization"];
const statuses = ["Open", "Upcoming", "Closed"];
const agencies = ["MATRADE", "MDEC", "HRD Corp"];
const sizes = ["Micro", "Small", "Medium"];
const ages = ["<1 year", "1-3 years", "3+ years"];

const grantsMock = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Grant ${i + 1}`,
  agency: agencies[i % agencies.length],
  funding: `Up to RM${(i + 1) * 1000}`,
  status: statuses[i % statuses.length],
  deadline: "30 June 2025",
  purpose: purposes[i % purposes.length],
  sector: sectors[i % sectors.length],
  size: sizes[i % sizes.length],
  age: ages[i % ages.length],
  region: "Malaysia + International",
  eligible: i % 2 === 0,
  recommendationReason: "Matches your business profile & recent activities.",
}));

export default function RecommendedGrants() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(filtersDefault);
  const [showFilter, setShowFilter] = useState(false);
  const [checklist, setChecklist] = useState(new Set());
  const [showCompare, setShowCompare] = useState(false);
  const [tooltipGrantId, setTooltipGrantId] = useState(null);

  useEffect(() => {
    if (showFilter || showCompare) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilter, showCompare]);

  const handleBackClick = () => navigate(-1);

  const itemsPerPage = 9;

  const filteredGrants = useMemo(() => {
    return grantsMock.filter((g) => {
      return (
        (!filters.size || g.size === filters.size) &&
        (!filters.age || g.age === filters.age) &&
        (!filters.sector || g.sector === filters.sector) &&
        (!filters.purpose || g.purpose === filters.purpose) &&
        (!filters.status || g.status === filters.status) &&
        (!filters.agency || g.agency === filters.agency)
      );
    });
  }, [filters]);

  const paginatedGrants = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGrants.slice(start, start + itemsPerPage);
  }, [filteredGrants, currentPage]);

  const totalPages = Math.ceil(filteredGrants.length / itemsPerPage);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const toggleChecklist = (id) => {
    setChecklist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 py-8 max-w-[1600px] mx-auto w-full">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button onClick={handleBackClick} className="flex items-center text-[#3B4A74]">
          <ChevronLeft className="h-8 w-8 mr-2" />
          <span className="text-xl font-semibold">Back</span>
        </button>
      </div>

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-indigo-900">Grants For You</h1>
        <p className="text-indigo-700">Find out which grant suits your business</p>
      </header>

      {/* Filters + Count + Compare Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center gap-2 text-indigo-800 font-medium"
          onClick={() => setShowFilter(true)}
        >
          <Filter className="w-5 h-5" />
          Filter
        </button>

        <div className="text-indigo-800 font-medium">{filteredGrants.length} grants found</div>

        <button
          disabled={checklist.size < 2}
          onClick={() => setShowCompare(true)}
          className={`flex items-center gap-2 font-medium px-3 py-1 rounded ${
            checklist.size >= 2
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-indigo-300 text-indigo-500 cursor-not-allowed"
          }`}
        >
          <Layers className="w-5 h-5" />
          Compare ({checklist.size})
        </button>
      </div>

      {/* Grant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {paginatedGrants.map((grant) => {
          const isSaved = checklist.has(grant.id);
          return (
            <div
              key={grant.id}
              className="bg-white border border-indigo-100 shadow rounded-2xl p-6 flex flex-col justify-between relative"
            >
              {/* Tooltip */}
              {tooltipGrantId === grant.id && (
                <div className="absolute top-2 right-10 z-30 bg-indigo-900 text-white text-xs p-2 rounded shadow-lg max-w-xs">
                  {grant.recommendationReason}
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-indigo-900">{grant.name}</h2>
                  <button
                    onClick={() =>
                      setTooltipGrantId((id) => (id === grant.id ? null : grant.id))
                    }
                    aria-label="Why recommended?"
                    className="text-indigo-500 hover:text-indigo-700"
                    onMouseLeave={() => setTooltipGrantId(null)}
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-sm text-indigo-800 space-y-1">
                  <p>
                    <strong>Agency:</strong> {grant.agency}
                  </p>
                  <p>
                    <strong>Funding:</strong> {grant.funding}
                  </p>
                  <p>
                    <strong>Status:</strong> {grant.status} | Deadline: {grant.deadline}
                  </p>
                  {grant.eligible && <p><strong>Eligible</strong> based on your profile</p>}
                  <p>
                    <strong>Purpose:</strong> {grant.purpose}
                  </p>
                  <p>
                    <strong>Region:</strong> {grant.region}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleChecklist(grant.id)}
                  className={`flex items-center justify-center gap-2 rounded-lg py-2 font-semibold ${
                    isSaved
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-indigo-600 text-indigo-700 hover:bg-indigo-50"
                  }`}
                  aria-pressed={isSaved}
                >
                  {isSaved ? (
                    <>
                      <CheckSquare className="w-5 h-5" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Square className="w-5 h-5" />
                      Save to Checklist
                    </>
                  )}
                </button>
                <button className="border border-indigo-600 text-indigo-700 hover:bg-indigo-50 rounded-lg py-2 flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" /> View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded font-semibold ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Overlay */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowFilter(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-indigo-800">Filter Options</h2>

            {[
              { label: "Business Size", key: "size", options: sizes },
              { label: "Business Age", key: "age", options: ages },
              { label: "Sector", key: "sector", options: sectors },
              { label: "Purpose", key: "purpose", options: purposes },
              { label: "Status", key: "status", options: statuses },
              { label: "Agency", key: "agency", options: agencies },
            ].map(({ label, key, options }) => (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium text-indigo-700 mb-1">
                  {label}
                </label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={filters[key]}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                >
                  <option value="">All</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              onClick={() => {
                setFilters(filtersDefault);
                setCurrentPage(1);
              }}
              className="mt-4 w-full py-2 rounded-md border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-60 flex justify-center items-center p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowCompare(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-indigo-900">Compare Grants</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-indigo-300">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border border-indigo-300 p-2 text-left">Field</th>
                    {[...checklist].map((id) => {
                      const grant = grantsMock.find((g) => g.id === id);
                      return (
                        <th key={id} className="border border-indigo-300 p-2 text-left">
                          {grant?.name}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Agency", key: "agency" },
                    { label: "Funding", key: "funding" },
                    { label: "Status", key: "status" },
{ label: "Deadline", key: "deadline" },
{ label: "Purpose", key: "purpose" },
{ label: "Sector", key: "sector" },
{ label: "Business Size", key: "size" },
{ label: "Business Age", key: "age" },
{ label: "Region", key: "region" },
{ label: "Eligibility", key: "eligible" },
{ label: "Recommendation Reason", key: "recommendationReason" },
].map(({ label, key }) => (
<tr key={key} className="odd:bg-indigo-50">
<td className="border border-indigo-300 p-2 font-semibold">{label}</td>
{[...checklist].map((id) => {
const grant = grantsMock.find((g) => g.id === id);
let value = grant?.[key];
if (typeof value === "boolean") value = value ? "Yes" : "No";
return (
<td key={id} className="border border-indigo-300 p-2">
{value ?? "-"}
</td>
);
})}
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
)}
</div>
);
}