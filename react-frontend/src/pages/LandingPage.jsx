import React, { useState } from "react";
import Background from "../components/Background";
import { ArrowRight, CheckCircle, Sparkles, Shield, Menu, X } from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <Background />

      {/* Navbar */}
      <header className="absolute top-0 w-full flex justify-between items-center px-6 md:px-12 py-4 bg-white backdrop-blur-sm shadow-sm z-50">
        <h2 className="text-2xl font-bold text-blue-600">Fyndi</h2>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <button onClick={() => handleScroll("about")} className="hover:text-blue-600 transition">
            About
          </button>
          <button onClick={() => handleScroll("features")} className="hover:text-blue-600 transition">
            Features
          </button>
          <Link to="/login" className="hover:text-blue-600 transition">
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 z-40 md:hidden">
          <button onClick={() => handleScroll("about")} className="hover:text-blue-600 transition">
            About
          </button>
          <button onClick={() => handleScroll("features")} className="hover:text-blue-600 transition">
            Features
          </button>
          <Link to="/login" className="hover:text-blue-600 transition">
            Login
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-12 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Welcome to <span className="text-blue-600">Fyndi</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            A smarter, simpler way to manage your notes and stay organized — built with speed, security, and you in mind.
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
            <button
              onClick={() => handleScroll("about")}
              className="px-6 py-3 bg-white border border-blue-200 text-blue-600 font-medium rounded-lg shadow hover:bg-blue-50 transition duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Fyndi?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
              <Sparkles className="w-10 h-10 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Smart Organization</h3>
              <p className="mt-2 text-gray-600">Easily categorize, tag, and retrieve your notes with ease.</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
              <Shield className="w-10 h-10 text-green-600 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Secure by Design</h3>
              <p className="mt-2 text-gray-600">Your notes are encrypted and protected with enterprise-level security.</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
              <CheckCircle className="w-10 h-10 text-purple-600 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Fast & Reliable</h3>
              <p className="mt-2 text-gray-600">Access your notes anytime, anywhere — instantly synced across devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to organize your life smarter?</h2>
        <p className="mt-4 text-lg">Join thousands of users who trust Fyndi daily.</p>
        <Link
          to="/signup"
          className="mt-6 inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-6 text-center">
        © {new Date().getFullYear()} Fyndi. All rights reserved.
      </footer>
    </>
  );
};

export default LandingPage;
