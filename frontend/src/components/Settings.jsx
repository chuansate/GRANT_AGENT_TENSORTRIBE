import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNavigation = (path) => {
    navigate(path);
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

      {/* Title */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900">Settings</h1>
        <p className="text-indigo-700 mt-3 text-lg">
          Customize your app experience to match your preferences.
        </p>
      </div>

      {/* Settings List */}
      <div className="w-full mx-auto bg-white rounded-md shadow-[0_0_15px_rgba(0,0,0,0.15)] divide-y divide-indigo-100">
        {/* Language */}
        <button
          onClick={() => handleNavigation("/settings/language")}
          className="w-full flex justify-between items-center p-6 hover:bg-indigo-50 transition-colors"
        >
          <div className="flex flex-col items-start">
            <p className="font-semibold text-indigo-900">Language</p>
            <p className="text-sm text-indigo-500">Change your display language</p>
          </div>
          <ChevronRight className="text-indigo-400" />
        </button>

        {/* Notifications (example placeholder) */}
        <button
          onClick={() => alert("Notifications settings coming soon.")}
          className="w-full flex justify-between items-center p-6 hover:bg-indigo-50 transition-colors"
        >
          <div className="flex flex-col items-start">
            <p className="font-semibold text-indigo-900">Notifications</p>
            <p className="text-sm text-indigo-500">Enable or disable push alerts</p>
          </div>
          <ChevronRight className="text-indigo-400" />
        </button>

        {/* Account Settings (optional placeholder) */}
        <button
          onClick={() => handleNavigation("/settings/account")}
          className="w-full flex justify-between items-center p-6 hover:bg-indigo-50 transition-colors"
        >
          <div className="flex flex-col items-start">
            <p className="font-semibold text-indigo-900">Account</p>
            <p className="text-sm text-indigo-500">Manage your profile and data</p>
          </div>
          <ChevronRight className="text-indigo-400" />
        </button>
      </div>
    </div>
  );
}
