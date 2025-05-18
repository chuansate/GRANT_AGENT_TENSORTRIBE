import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";

export default function GrantDashboard() {
  const [open, setOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const cards = [
    {
      title: "Grant Eligibility",
      description: "Find out which grant your business is eligible for",
      link: "/eligibility-checker",
      image: "/grant-eligibility.png",
    },
    {
      title: "ROI Calculator",
      description: "A simulation playground for you to play around with the budget",
      link: "/roi-calculator",
      image: "/roi-calculator.png",
    },
    {
      title: "Recommended Grants",
      description: "Explore suitable grants your business may expand to",
      link: "/recommended-grants",
      image: "/recommended-grants.jpg",
    },
  ];

  const whatsNew = [
    {
      title: "SME Digitalisation Grant 2025",
      description:
        "Up to RM5,000 matching grant to help SMEs digitise operations — now includes e-invoicing & POS systems.",
    },
    {
      title: "Women Entrepreneurs Grant (WEG)",
      description:
        "For female-led businesses — up to RM30,000 for business expansion, marketing & capability building.",
    },
    {
      title: "Green Tech Financing Scheme 3.0",
      description:
        "For eco-conscious SMEs — enjoy interest subsidies & loan guarantees. Valid until Dec 2025.",
    },
  ];

  const sidebarItems = [
    { label: "Account", link: "/account" },
    { label: "Language", link: "/language" },
    { label: "Settings", link: "/settings" },
    { label: "Logout", action: () => setShowLogoutModal(true) },
  ];

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex">
      {/* Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full max-h-screen w-64 bg-indigo-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
        aria-label="Sidebar menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-700 sticky top-0 bg-indigo-900 z-10">
          <h2 className="text-white text-lg font-semibold tracking-wide">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-white hover:text-indigo-300 transition"
          >
            <X size={28} />
          </button>
        </div>
        <nav className="p-4 space-y-3">
          {sidebarItems.map((item, i) =>
            item.link ? (
              <Link
                key={i}
                to={item.link}
                onClick={() => setOpen(false)}
                className="block text-left text-indigo-200 hover:bg-indigo-700 hover:text-white p-3 rounded-md font-medium transition"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={i}
                onClick={() => {
                  setOpen(false);
                  item.action?.();
                }}
                className="w-full text-left text-indigo-200 hover:bg-indigo-700 hover:text-white p-3 rounded-md font-medium transition"
              >
                {item.label}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 pt-6 pb-16 max-w-[1600px] mx-auto">
        {/* Top Row: Hamburger Menu */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setOpen(true)}
            className="text-indigo-900 hover:text-indigo-700 focus:outline-none transition"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Header & CTA */}
        <header className="flex flex-col justify-center items-center text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-1">
            Hello Eddie,
          </h1>
          <p className="text-indigo-700 text-lg sm:text-xl">
            Ready to find your next grant?
          </p>
        </header>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cards.map((card, i) => (
            <Link
              key={i}
              to={card.link}
              className="flex flex-col sm:flex-row bg-white rounded-md shadow-md hover:shadow-lg transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <div className="h-40 sm:h-auto sm:w-1/3 bg-indigo-100 flex items-center justify-center text-indigo-400 font-semibold select-none overflow-hidden rounded-t-md sm:rounded-t-none sm:rounded-l-md">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={`${card.title} illustration`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Image Placeholder"
                )}
              </div>
              <div className="p-6 sm:w-2/3 flex flex-col justify-center">
                <h2 className="text-xl font-semibold text-indigo-900 mb-2">{card.title}</h2>
                <p className="text-indigo-700 text-sm">{card.description}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* What's New Section */}
        <section>
          <h2 className="text-2xl font-extrabold text-indigo-900 mb-8">What's New</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatsNew.map((item, i) => (
              <article
                key={i}
                className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">{item.title}</h3>
                <p className="text-indigo-700 text-sm">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Chatbot Toggle Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-indigo-700 hover:bg-indigo-800 text-white p-4 rounded-full shadow-lg transition"
        onClick={() => setShowChatbot(!showChatbot)}
        aria-label="Toggle chatbot"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot Component */}
      {showChatbot && (
        <div className="fixed bottom-20 right-6 z-50">
          <Chatbot />
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
            <h3 className="text-lg font-bold text-indigo-900 mb-4">Are you sure you want to logout?</h3>
            <p className="text-sm text-indigo-700 mb-6">You’ll be redirected to the login page.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  window.location.href = "http://localhost:3000/login";
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition"
              >
                Yes, Log Me Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
