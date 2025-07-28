import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Settings,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCircle,
  Shield,
  Home,
  Package,
  Users
} from "lucide-react";

const AdminHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleProfileClick = () => {
    navigate("/adminprofile");
  };

  const handleSettingsClick = () => {
    navigate("/adminsetting");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event('authStateChange'));
    navigate("/adminlogin");
  };

  return (
    <header className="bg-[#f3f8e9] shadow-sm border-bg-[#f3f8e9] z-20">
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Page Title */}
          <div className="flex items-center">
            <Link to="/admindashboard" className="flex items-center">
              <Shield className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Sippure Admin</span>
            </Link>
          </div>

          {/* Right side - Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-[#f3f8e9] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={18} />
              </div>
              <span className="hidden md:block text-sm font-medium">Reesta</span>
              <ChevronDown size={16} />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#f3f8e9] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-[#f3f8e9]">
                    <div className="font-medium">Reesta</div>
                    <div className="text-gray-500">admin@company.com</div>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f8e9] text-left"
                  >
                    <UserCircle size={16} className="mr-3" />
                    Profile
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f8e9] text-left"
                  >
                    <Settings size={16} className="mr-3" />
                    Settings
                  </button>
                  <div className="border-t border-[#f3f8e9]">
                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f8e9] text-left"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f3f8e9]">
      {/* Header is now full width */}
      <AdminHeader />
      {/* Main content takes up remaining space */}
      <main className="flex-1 overflow-y-auto bg-[#f3f8e9] p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;