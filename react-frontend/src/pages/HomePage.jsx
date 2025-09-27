import React from "react";
import { LogOut, LogOutIcon } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const {user, logout} = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">MySocial</h1>
        <button
          className='flex mt-5 py-3 px-4 bg-gradient-to-r from-[#74036a] to-[#d4102a] text-white 
          font-bold rounded-lg shadow-lg hover:opacity-80 transition duration-200 cursor-pointer'
          type='submit'
          onClick={handleLogout}
        >
          <LogOutIcon size={15} />
          <p className="ml-2 text-xs">Logout</p>
        </button>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-sm p-4">
          <h2 className="font-semibold text-gray-700 mb-3">Friends</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>👤 John Doe</li>
            <li>👤 Jane Smith</li>
            <li>👤 Alex Johnson</li>
          </ul>
        </aside>

        {/* Feed */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-xl mx-auto space-y-4">
            {user && (
              <div className="mb-4 text-gray-700 font-medium">
                Welcome back, {user.firstName}
              </div>
            )}

            {/* Create Post */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="mt-2 px-4 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">
                Post
              </button>
            </div>

            {/* Example Post */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600 text-sm mt-1">
                Just joined this new app!
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600 text-sm mt-1">
                Loving the clean design here
              </p>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-64 bg-white shadow-sm p-4">
          <h2 className="font-semibold text-gray-700 mb-3">Suggestions</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Follow Tech Trends</li>
            <li>Join Design Group</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
