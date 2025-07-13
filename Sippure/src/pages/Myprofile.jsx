import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Heart, ShoppingBag, Star, Edit3, Camera, Leaf, Calendar, Award } from 'lucide-react';

export default function SippureProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [userInfo, setUserInfo] = useState({
    name: 'Reesta',
    email: 'reestapradhan@email.com',
    phone: '+977 984-1234567',
    location: 'Indrachowk, Kathmandu',
    joinDate: 'March 2024',
    membershipLevel: 'Tea Connoisseur',
  });

  const favoriteBlends = [
    { name: 'Chamomile Dream', type: 'Relaxation', rating: 5, image: '🌼' },
    { name: 'Green Energy', type: 'Energy', rating: 4, image: '🍃' },
    { name: 'Mint Refresh', type: 'Digestive', rating: 5, image: '🌿' },
    { name: 'Ginger Spice', type: 'Wellness', rating: 4, image: '🫚' },
  ];

  const recentOrders = [
    { id: '#SP001', date: '2024-07-10', items: 'Chamomile tea', total: 'RS 300', status: 'Delivered' },
    { id: '#SP002', date: '2024-06-28', items: 'Hibiscus tea', total: 'RS 300', status: 'Delivered' },
    { id: '#SP003', date: '2024-06-15', items: 'Butterfly tea', total: 'RS 350', status: 'Delivered' },
  ];

  const achievements = [
    { title: 'Tea Explorer', description: 'Tried 15 different blends', icon: '🗺️' },
    { title: 'Wellness Warrior', description: 'Ordered wellness teas 10 times', icon: '💪' },
    { title: 'Loyal Sipper', description: 'Member for over 1 year', icon: '👑' },
  ];

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-full p-2" style={{ backgroundColor: '#a4d57c' }}>
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-green-800">Sippure</h1>
            </div>
            <div className="text-sm text-gray-600">Welcome back, {userInfo.name}!</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#a4d57c' }}
                >
                  <User className="w-12 h-12 text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{userInfo.name}</h2>
                <p className="text-green-600 font-medium mb-2">{userInfo.membershipLevel}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Member since {userInfo.joinDate}
                  </span>
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    {achievements.length} Achievements
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: isEditing ? '#c57cd5' : '#a4d57c',
              }}
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                {isEditing ? (
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-700">{userInfo.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-700">{userInfo.phone}</span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-700">{userInfo.location}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Tea Preference: Herbal & Wellness</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex space-x-0 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'favorites', label: 'Favorite Blends', icon: Heart },
              { id: 'orders', label: 'Order History', icon: ShoppingBag },
              { id: 'achievements', label: 'Achievements', icon: Award },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold text-green-600">47</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Favorite Category</h3>
                  <p className="text-xl font-bold text-amber-600">Relaxation Teas</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Points Earned</h3>
                  <p className="text-3xl font-bold text-blue-600">2,340</p>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteBlends.map((blend, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{blend.image}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{blend.name}</h4>
                          <p className="text-sm text-gray-600">{blend.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < blend.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-900">{order.id}</span>
                        <span className="text-sm text-gray-600">{order.date}</span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{order.items}</p>
                    <p className="font-semibold text-green-600">{order.total}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-50 to-amber-50 rounded-lg p-4 text-center"
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
