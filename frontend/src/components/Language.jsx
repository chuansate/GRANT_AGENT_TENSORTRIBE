import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function Language() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setLanguage(e.target.value);
    // You could hook this into a context or i18n library later
    console.log("Selected language:", e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 w-full px-6 py-8 max-w-[1600px] mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBackClick}
          className="flex items-center text-indigo-700 hover:text-indigo-900 transition-colors"
          type="button"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 mr-2" />
          <span className="font-semibold text-lg">Back</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900">Language Settings</h1>
        <p className="text-indigo-700 mt-3 text-lg">
          Select your preferred language for the app interface.
        </p>
      </div>

      {/* Language Selector */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
        <div className="mb-6">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-indigo-700 mb-2"
          >
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={handleChange}
            className="block w-full rounded-lg border border-indigo-300 px-4 py-3 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="en">English</option>
            <option value="ms">Bahasa Malaysia</option>
            <option value="zh">中文 (Chinese)</option>
          </select>
        </div>

        <button
          onClick={() => console.log("Saved language:", language)}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md py-4 shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Save Language
        </button>
      </div>
    </div>
  );
}
