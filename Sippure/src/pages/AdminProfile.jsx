import React, { useState } from 'react';
import {
  User,
  Edit,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  X,
} from 'lucide-react';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: 'Sippure Admin',
    email: 'admin@sippuretea.com',
    phone: '9801234567',
    address: 'Green Valley, Kathmandu, Nepal',
    joinDate: 'March 2024',
    profileImage: null,
  });

  const [originalInfo, setOriginalInfo] = useState({ ...adminInfo });

  const handleInputChange = (field, value) => {
    setAdminInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdminInfo((prev) => ({
          ...prev,
          profileImage: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setOriginalInfo({ ...adminInfo });
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setOriginalInfo({ ...adminInfo });
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setAdminInfo({ ...originalInfo });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f6fff0] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#367e02] mb-2">Admin Profile</h1>
        <p className="text-[#7a9c74] mb-6">Manage Sippure Herbal Tea’s admin information</p>

        <div className="bg-white border border-[#d0e7c4] shadow-xl rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#367e02]">Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-[#d2edc2] text-[#367e02] px-4 py-2 rounded-lg hover:bg-[#c4e2b2] transition shadow-sm"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#367e02] text-white px-4 py-2 rounded-lg hover:bg-[#2e6a01] transition shadow-sm"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-[#ef4444] text-white px-4 py-2 rounded-lg hover:bg-[#dc2626] transition shadow-sm"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-36 h-36 rounded-full bg-[#f0fdf4] border-4 border-[#cde6bb] flex items-center justify-center overflow-hidden shadow-md">
                  {adminInfo.profileImage ? (
                    <img
                      src={adminInfo.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-[#8bc34a]" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-[#367e02] text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-[#2c6601] transition">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm text-[#367e02] font-medium mb-1">Admin Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={adminInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full border border-[#cde6bb] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#367e02]"
                    />
                  ) : (
                    <p className="text-[#333] font-medium py-1">{adminInfo.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-[#367e02] font-medium mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={adminInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full border border-[#cde6bb] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#367e02]"
                    />
                  ) : (
                    <p className="text-[#333] py-1 flex items-center gap-2">
                      <Phone size={16} className="text-[#8bc34a]" />
                      {adminInfo.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#367e02] font-medium mb-1">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={adminInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-[#cde6bb] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#367e02]"
                    />
                  ) : (
                    <p className="text-[#333] py-1 flex items-center gap-2">
                      <Mail size={16} className="text-[#8bc34a]" />
                      {adminInfo.email}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#367e02] font-medium mb-1">Store Address</label>
                  {isEditing ? (
                    <textarea
                      value={adminInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full border border-[#cde6bb] rounded-lg px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-[#367e02]"
                    />
                  ) : (
                    <p className="text-[#333] py-1 flex items-start gap-2">
                      <MapPin size={16} className="text-[#8bc34a] mt-1" />
                      {adminInfo.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Join Date */}
              <div className="mt-6 bg-[#f9fff2] border border-[#cde6bb] rounded-lg p-4">
                <p className="text-[#367e02] flex items-center gap-2 text-sm">
                  <Calendar size={16} />
                  Managing Sippure since {adminInfo.joinDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
