import React from "react";
import Background from "../components/Background";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <>
      <Background />
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6">
        {/* Hero Section */}
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Welcome to <span className="text-blue-600">Fyndi</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            A smarter, simpler way to manage your notes and stay organized —
            built with speed, security, and you in mind.
          </p>

          {/* Call To Action */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-gradient-to-r from-[#10DE8F] to-[#3FAFFF] text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition duration-200 flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-blue-200 text-blue-600 font-medium rounded-lg shadow hover:bg-blue-50 transition duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} Fyndi. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
