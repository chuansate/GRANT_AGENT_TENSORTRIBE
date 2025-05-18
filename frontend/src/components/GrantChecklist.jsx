import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function GrantDetails() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const checklist = [
    {
      section: "Company Information",
      items: [
        "Form 9 / Form 13 (SSM registration cert)",
        "Latest Company Profile (ROC/ROB printout)",
        "Company Bank Statement (last 3 months)",
        "Company’s Business License (if applicable)",
        "Company’s Memorandum & Articles of Association",
      ],
    },
    {
      section: "Financial Requirements",
      items: [
        "Audited Financial Statements (2 years)",
        "Tax Return / LHDN e-Filing Receipt",
        "Management Account (if SME)",
        "Cash Flow Statement (recent quarter)",
        "Latest Income Tax Clearance Letter",
      ],
    },
    {
      section: "Project Details",
      items: [
        "Project Proposal / Business Plan",
        "Marketing Plan for the funded activities",
        "Quotation / Invoice from suppliers",
        "Timeline & Milestones for the project",
        "List of project team members and their roles",
      ],
    },
    {
      section: "Supporting Documents",
      items: [
        "Letter of Intent / Support from partners (if any)",
        "Proof of participation in previous exhibitions (if applicable)",
        "Photos or evidence of prior marketing campaigns",
        "Any relevant licenses or certifications",
      ],
    },
    {
      section: "Declarations & Others",
      items: [
        "Signed Declaration Form",
        "Grant Agreement Terms & Conditions acknowledgement",
        "Copy of Identity Card / Passport of company owner(s)",
        "Contact details and consent for data sharing",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 w-full px-6 py-8 max-w-[1600px] mx-auto">
      {/* Back Button */}
      <div className="flex items-center mb-6 max-w-6xl mx-auto">
        <button
          onClick={handleBackClick}
          className="flex items-center text-sm text-[#3B4A74] hover:text-[#1E2A47] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          type="button"
          aria-label="Go back"
        >
          <ChevronLeft className="h-8 w-8 mr-2 text-[#3B4A74]" />
          <span className="text-[#3B4A74] text-xl font-semibold select-none">Back</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-900 select-none">
          Your Application Checklist
        </h1>
        <p className="text-indigo-700 mt-3 text-lg select-none">
          MDG - Market Dev Grant
        </p>
      </div>

      {/* Application Checklist Container */}
      <div className="bg-white rounded-md shadow-lg p-10 max-w-6xl mx-auto">
        {checklist.map(({ section, items }) => (
          <section
            key={section}
            className="mb-12 border border-indigo-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-indigo-900 font-semibold text-2xl mb-6">{section}</h3>
            <ul className="list-none space-y-4 text-indigo-700 text-lg">
              {items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <input
                    type="checkbox"
                    id={`${section}-${i}`}
                    className="mt-1 mr-4 h-6 w-6 text-indigo-600 rounded focus:ring-indigo-500 transition-transform duration-150 hover:scale-110 focus:scale-110 cursor-pointer"
                  />
                  <label
                    htmlFor={`${section}-${i}`}
                    className="cursor-pointer select-none leading-relaxed"
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="mt-8 text-center">
          <button
            type="button"
            className="bg-indigo-700 hover:bg-indigo-800 text-white text-xl font-semibold px-14 py-5 rounded-md shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-400 w-full sm:w-auto"
          >
            Start Apply
          </button>
        </div>
      </div>
    </div>
  );
}
