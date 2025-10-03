import React, { useState } from "react";
import Background from "../components/Background";
import { ArrowRight, CheckCircle, Sparkles, Shield, Menu, X, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const toggleFAQ = (i) => {
    setOpenFAQ(openFAQ === i ? null : i);
  };

  const faqs = [
    {
      q: "Is Fyndi free to use?",
      a: "Yes! You can start for free with core features. We also offer premium plans for power users."
    },
    {
      q: "Will my notes sync across devices?",
      a: "Absolutely. Your notes are instantly synced on web and mobile, so you never miss a thought."
    },
    {
      q: "How secure is my data?",
      a: "We use enterprise-grade encryption, ensuring your notes are private and secure."
    },
  ];

  return (
    <>
      <Background />

      {/* Navbar */}
      <header className="absolute top-0 w-full flex justify-between items-center px-6 md:px-12 py-4 bg-white backdrop-blur-sm shadow-sm z-50">
        <h2 className="text-2xl font-bold text-blue-600">Fyndi</h2>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <button onClick={() => handleScroll("about")} className="hover:text-blue-600 transition">About</button>
          <button onClick={() => handleScroll("features")} className="hover:text-blue-600 transition">Features</button>
          <button onClick={() => handleScroll("testimonials")} className="hover:text-blue-600 transition">Testimonials</button>
          <button onClick={() => handleScroll("faq")} className="hover:text-blue-600 transition">FAQ</button>
          <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 z-40 md:hidden">
          <button onClick={() => handleScroll("about")} className="hover:text-blue-600 transition">About</button>
          <button onClick={() => handleScroll("features")} className="hover:text-blue-600 transition">Features</button>
          <button onClick={() => handleScroll("testimonials")} className="hover:text-blue-600 transition">Testimonials</button>
          <button onClick={() => handleScroll("faq")} className="hover:text-blue-600 transition">FAQ</button>
          <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
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

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Fyndi</h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Fyndi is designed to help you capture ideas, organize tasks, and stay productive. 
            With real-time sync, powerful organization, and secure storage, it’s the all-in-one notes solution you’ve been waiting for.
          </p>
        </div>
      </section>

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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Users Say</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Sarah K.", text: "Fyndi completely changed how I organize my work. It's fast, clean, and secure." },
              { name: "Daniel M.", text: "Finally, a notes app that doesn’t feel clunky. Sync works perfectly." },
              { name: "Liza P.", text: "Love the design and ease of use. I can’t imagine going back!" },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
                <Quote className="w-8 h-8 text-blue-500 mx-auto" />
                <p className="mt-4 text-gray-700 italic">"{t.text}"</p>
                <h4 className="mt-4 font-semibold text-gray-900">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-6">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex justify-between items-center text-left font-medium text-gray-800"
                >
                  {item.q}
                  {openFAQ === i ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFAQ === i && <p className="mt-3 text-gray-600">{item.a}</p>}
              </div>
            ))}
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
      <footer className="bg-gray-900 text-gray-400 text-sm py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} Fyndi. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
