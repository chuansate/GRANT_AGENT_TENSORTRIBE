import { useEffect, useState } from "react";
import { Download, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GrantApplicationAssistant({ userProfile }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const mdgSteps = [
      {
        instruction: "Register an account or log in to the MATRADE portal.",
      },
      {
        instruction: "Navigate to the MDG application section and start a new application.",
      },
      {
        instruction: "Fill out the MDG Application Form",
        form: {
          id: "msme-form",
          downloadUrl: "/pdf/MSME_Digital_Form_ApplicationForm.pdf",
          missingFields: ["Company Registration Number", "Annual Sales Turnover"],
        },
      },
      {
        instruction: "Upload mandatory documents:",
      },
      {
        instruction: "- Company Profile",
      },
      {
        instruction: "- Business Registration Certificate",
      },
      {
        instruction: "- Latest Audited Financial Statements",
      },
      {
        instruction: "Submit the completed application via the portal. You will receive an email confirmation.",
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setSteps(mdgSteps);
      setIsLoading(false);
    }, 1000);
  }, []);

  const profileComplete = userProfile?.isComplete;
  const completionPercent = userProfile?.completionPercent || 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 w-full px-6 py-8 max-w-[1600px] mx-auto">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-[#3B4A74] hover:text-[#1E2A47] cursor-pointer transition-colors"
          type="button"
          aria-label="Go back"
        >
          <ChevronLeft className="h-8 w-8 mr-2 text-[#3B4A74]" />
          <span className="text-[#3B4A74] text-xl font-semibold">Back</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="text-center mb-12 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900">Grant Application Assistant</h1>
        <p className="text-indigo-700 mt-3 text-lg">
          Smart steps & AI-filled forms based on your profile
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center text-indigo-800 text-xl font-medium mt-8">
          Loading steps...
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-lg p-10 mt-12 max-w-6xl mx-auto space-y-10">
          {steps.map((step, index) => (
            <section
              key={index}
              className="border border-indigo-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-indigo-900 font-semibold text-2xl mb-3">Step {index + 1}</h3>
              <p className="text-indigo-700 text-lg">{step.instruction}</p>

              {step.form && (
                <div className="mt-4 text-indigo-700 text-base">
                  <p className="mb-1">✅ Form auto-filled based on your profile.</p>
                  {step.form.missingFields.length > 0 && (
                    <p className="text-red-600">
                      Missing fields: {step.form.missingFields.join(", ")}
                    </p>
                  )}
                  <a
                    href={step.form.downloadUrl}
                    download
                    className="inline-flex items-center mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow"
                  >
                    <Download size={18} className="mr-2" /> Download Form
                  </a>
                </div>
              )}
            </section>
          ))}
        </div>
      )}

      {/* Profile completion prompt */}
      {!profileComplete && !isLoading && (
        <div className="mt-12 p-6 bg-yellow-100 border border-yellow-300 rounded-md text-center max-w-3xl mx-auto">
          <p className="text-yellow-800 text-lg">
            ⚠️ Your profile is <strong>{completionPercent}% complete</strong>. Complete it to reduce manual form filling.
          </p>
          <a
            href="/account"
            className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded text-lg font-semibold"
          >
            Complete My Profile
          </a>
        </div>
      )}
    </div>
  );
}
