import React, { useState } from "react";
import Background from "../components/Background";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield,
  Menu,
  X,
  Quote,
  ChevronDown,
  ChevronUp,
  Users,
  Mail,
  Star,
} from "lucide-react";
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
      a: "Yes! You can start for free with core features. We also offer premium plans for power users.",
    },
    {
      q: "Will my notes sync across devices?",
      a: "Absolutely. Your notes are instantly synced on web and mobile, so you never miss a thought.",
    },
    {
      q: "How secure is my data?",
      a: "We use enterprise-grade encryption, ensuring your notes are private and secure.",
    },
  ];

  return (
    <>
      <Background />

      {/* Navbar */}
      <header className="absolute top-0 w-full flex justify-between items-center px-6 md:px-12 py-4 bg-white backdrop-blur-sm shadow-sm z-50">
        <h2 className="text-2xl font-bold text-blue-600">Fyndi</h2>
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <button onClick={() => handleScroll("about")} className="hover:text-blue-600 transition">About</button>
          <button onClick={() => handleScroll("features")} className="hover:text-blue-600 transition">Features</button>
          <button onClick={() => handleScroll("how")} className="hover:text-blue-600 transition">How It Works</button>
          <button onClick={() => handleScroll("pricing")} className="hover:text-blue-600 transition">Pricing</button>
          <button onClick={() => handleScroll("testimonials")} className="hover:text-blue-600 transition">Testimonials</button>
          <button onClick={() => handleScroll("faq")} className="hover:text-blue-600 transition">FAQ</button>
          <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
        </nav>
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 z-40 md:hidden">
          {["about", "features", "how", "pricing", "testimonials", "faq"].map((id) => (
            <button key={id} onClick={() => handleScroll(id)} className="hover:text-blue-600 transition capitalize">
              {id}
            </button>
          ))}
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

      {/* About */}
      <section id="about" className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Fyndi</h2>
          <p className="mt-6 text-gray-600 text-lg">
            Fyndi helps you capture ideas, organize tasks, and stay productive. With real-time sync and secure storage, it’s the all-in-one notes app you’ve been waiting for.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Fyndi?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg">
              <Sparkles className="w-10 h-10 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Smart Organization</h3>
              <p className="mt-2 text-gray-600">Tag and categorize your notes effortlessly.</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg">
              <Shield className="w-10 h-10 text-green-600 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Secure by Design</h3>
              <p className="mt-2 text-gray-600">Encrypted and protected with enterprise-level security.</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg">
              <CheckCircle className="w-10 h-10 text-purple-600 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Fast & Reliable</h3>
              <p className="mt-2 text-gray-600">Access your notes anywhere, anytime — instantly synced.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-white text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              { step: "Sign Up", text: "Create your free account in seconds." },
              { step: "Organize", text: "Capture notes, tasks, and ideas in one place." },
              { step: "Sync", text: "Access everything across devices instantly." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl shadow bg-gray-50 hover:shadow-md">
                <Star className="w-10 h-10 text-indigo-600 mx-auto" />
                <h3 className="mt-4 text-xl font-semibold">{item.step}</h3>
                <p className="mt-2 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple Pricing</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-2xl font-semibold">Free</h3>
              <p className="mt-2 text-gray-600">Perfect for personal use</p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li>✔ Unlimited notes</li>
                <li>✔ Real-time sync</li>
                <li>✔ Basic support</li>
              </ul>
              <Link to="/signup" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Get Started
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg border-2 border-blue-600">
              <h3 className="text-2xl font-semibold">Pro</h3>
              <p className="mt-2 text-gray-600">For professionals & teams</p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li>✔ Everything in Free</li>
                <li>✔ Advanced search</li>
                <li>✔ Priority support</li>
              </ul>
              <Link to="/signup" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Users Say</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Sarah K.", text: "Fyndi completely changed how I organize my work." },
              { name: "Daniel M.", text: "Finally, a notes app that doesn’t feel clunky. Sync works perfectly." },
              { name: "Liza P.", text: "Love the design and ease of use. I can’t imagine going back!" },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md">
                <Quote className="w-8 h-8 text-blue-500 mx-auto" />
                <p className="mt-4 text-gray-700 italic">"{t.text}"</p>
                <h4 className="mt-4 font-semibold text-gray-900">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">FAQ</h2>
          <div className="mt-10 space-y-6">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <button onClick={() => toggleFAQ(i)} className="w-full flex justify-between items-center text-left font-medium text-gray-800">
                  {item.q}
                  {openFAQ === i ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFAQ === i && <p className="mt-3 text-gray-600">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-indigo-600 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="mt-2">Subscribe to our newsletter for the latest features & tips.</p>
          <form className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button type="submit" className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-medium hover:bg-gray-100 transition flex items-center">
              <Mail className="w-5 h-5 mr-2" /> Subscribe
            </button>
          </form>
        </div>
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
