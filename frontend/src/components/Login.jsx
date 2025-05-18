import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../config.js";
import {PORT_NUM} from "../config.js"
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://${API_BASE_URL}:${PORT_NUM}/login`, {        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.msg || "Login failed");
      }

      const data = await res.json();

      // Save token & user info in localStorage for now
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after successful login
      navigate("/onboarding/step-1");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden md:h-[90vh] flex-col md:flex-row">
        {/* Branding Section */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center p-12 bg-gradient-to-br from-indigo-200 via-indigo-300 to-indigo-400 text-white">
          <h1 className="text-4xl font-extrabold mb-6">GrantWise SME</h1>
          <p className="text-lg leading-relaxed opacity-90">
            Empowering Malaysian SMEs to win grants fast & hassle-free. Use our AI assistant to
            simplify the grant application journey, maximize your chances, and grow your business.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-8 md:px-12 md:py-12 min-h-auto">
          <header className="mb-6 md:mb-10 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-extrabold text-indigo-900 mb-2 leading-tight">
              Welcome Back
            </h2>
            <p className="text-indigo-700 text-sm md:text-lg">
              Empowering SMEs to win grants — fast & hassle-free
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-indigo-900 font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-indigo-300 px-4 py-3 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-indigo-900 font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-indigo-300 px-4 pt-3 pb-1 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-800 underline"
              >
                Forgot Password?
              </a>
            </div>

            {error && (
              <p className="text-red-600 text-center font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-700 text-white py-3 rounded-md font-semibold hover:bg-indigo-800 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-indigo-700 text-sm md:text-base">
            Don’t have any account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-bold text-indigo-900 hover:underline"
              type="button"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
