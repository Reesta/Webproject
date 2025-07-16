import React, { useState } from "react";
import { Lock } from "lucide-react";

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Simulate password change
    console.log("Password Change Submitted:", formData);
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f3f8e9] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#e3f5d4] rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-black mb-6">Account Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "#a4d57c" }}
            className="w-full text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;