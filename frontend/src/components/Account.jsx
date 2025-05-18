import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function AccountPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Eddie Tan",
    email: "eddie@kopikita.my",
    businessName: "KopiKita F&B",
    phone: "+60 12-345 6789",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === ""
            ? ""
            : parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving profile:", formData);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 w-full px-6 py-8 max-w-[1600px] mx-auto">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackClick}
          className="flex items-center text-sm text-[#3B4A74] hover:text-[#1E2A47] cursor-pointer transition-colors"
          type="button"
          aria-label="Go back"
        >
          <ChevronLeft className="h-8 w-8 mr-2 text-[#3B4A74]" />
          <span className="text-[#3B4A74] text-xl font-semibold">Back</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900">My Account</h1>
        <p className="text-indigo-700 mt-3 text-lg">
          Update your personal and business details here.
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto bg-white shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Business Name", name: "businessName", type: "text" },
              {
                label: "Registration Number",
                name: "registrationNumber",
                type: "text",
              },
              {
                label: "Number of Employees",
                name: "numberOfEmployees",
                type: "number",
              },
              {
                label: "Business Sector",
                name: "businessSector",
                type: "text",
              },
              {
                label: "Annual Sales (MYR)",
                name: "annualSales",
                type: "number",
                step: "0.01",
              },
              {
                label: "% Ownership by Malaysians",
                name: "ownershipByMalaysians",
                type: "number",
                step: "0.1",
              },
              {
                label: "Years in Operation",
                name: "yearsInOperation",
                type: "number",
              },
              {
                label: "Registration Authority",
                name: "registrationAuthority",
                type: "text",
              },
              {
                label: "Export Market",
                name: "exportMarket",
                type: "text",
              },
            ].map(({ label, name, type, step }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-indigo-700 mb-2"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  step={step}
                  value={formData[name]}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-indigo-300 px-4 py-3 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md py-4 shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
