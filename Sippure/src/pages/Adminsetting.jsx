import React, { useState } from 'react';
import { Save, Bell, Shield, CreditCard, Globe, User, Lock } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  // State for General tab
  const [generalData, setGeneralData] = useState({
    storeName: 'Sippure',
    storeEmail: 'admin@sippure.com',
    phone: '+1 234 567 8900',
    storeAddress: 'Khusibur, Kathmandu, Nepal',
  });

  // State for Notifications tab
  const [notificationsData, setNotificationsData] = useState({
    newOrders: true,
    lowStockAlerts: true,
    weeklyReports: false,
  });

  // State for Security tab (passwords)
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State for Payment tab
  const [paymentData, setPaymentData] = useState({
    currency: 'Rs',
    taxRate: 5,
    paymentMethods: {
      cashOnDelivery: true,
      bankTransfer: true,
    },
  });

  // State for Store tab
  const [storeData, setStoreData] = useState({
    storeURL: 'https://sippure.com',
    storeDescription: 'Premium herbal blends and brewing equipment for tea enthusiasts',
    storeStatus: true,
    openingTime: '09:00',
    closingTime: '18:00',
  });

  const tabs = [
    { id: 'general', name: 'General', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'store', name: 'Store', icon: Globe },
  ];

  // Handlers for General tab inputs
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handlers for Notifications tab inputs
  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotificationsData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handlers for Security tab inputs
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Here you would handle password update logic
    alert('Password changed successfully!');
    setSecurityData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // Handlers for Payment tab inputs
  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in paymentData.paymentMethods) {
      setPaymentData((prev) => ({
        ...prev,
        paymentMethods: {
          ...prev.paymentMethods,
          [name]: checked,
        },
      }));
    } else if (type === 'number') {
      setPaymentData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setPaymentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handlers for Store tab inputs
  const handleStoreChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setStoreData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setStoreData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Save all settings handler
  const handleSaveChanges = () => {
    // Here you would typically send the data to a backend API
    const allSettings = {
      general: generalData,
      notifications: notificationsData,
      security: { ...securityData, newPassword: undefined, confirmPassword: undefined },
      payment: paymentData,
      store: storeData,
    };
    console.log('Saving settings:', allSettings);
    alert('Settings saved successfully!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    value={generalData.storeName}
                    onChange={handleGeneralChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
                  <input
                    type="email"
                    name="storeEmail"
                    value={generalData.storeEmail}
                    onChange={handleGeneralChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={generalData.phone}
                    onChange={handleGeneralChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
              <textarea
                name="storeAddress"
                rows={3}
                value={generalData.storeAddress}
                onChange={handleGeneralChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">New Orders</p>
                    <p className="text-sm text-gray-500">Get notified when new orders are placed</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="newOrders"
                      className="sr-only peer"
                      checked={notificationsData.newOrders}
                      onChange={handleNotificationsChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">Low Stock Alerts</p>
                    <p className="text-sm text-gray-500">Alert when products are running low</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="lowStockAlerts"
                      className="sr-only peer"
                      checked={notificationsData.lowStockAlerts}
                      onChange={handleNotificationsChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">Weekly Reports</p>
                    <p className="text-sm text-gray-500">Receive weekly sales and analytics reports</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="weeklyReports"
                      className="sr-only peer"
                      checked={notificationsData.weeklyReports}
                      onChange={handleNotificationsChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Security Settings</h3>
              <form onSubmit={handleSecuritySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={securityData.newPassword}
                    onChange={handleSecurityChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={securityData.confirmPassword}
                    onChange={handleSecurityChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: '#a4d57c' }}
                  className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Reset Password</span>
                </button>
              </form>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Payment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <input
                    type="text"
                    name="currency"
                    value={paymentData.currency}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={paymentData.taxRate}
                    onChange={handlePaymentChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <p className="font-medium text-black">Payment Methods</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="cashOnDelivery"
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        checked={paymentData.paymentMethods.cashOnDelivery}
                        onChange={handlePaymentChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="bankTransfer"
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        checked={paymentData.paymentMethods.bankTransfer}
                        onChange={handlePaymentChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Bank Transfer</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'store':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Store Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store URL</label>
                  <input
                    type="url"
                    name="storeURL"
                    value={storeData.storeURL}
                    onChange={handleStoreChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                  <textarea
                    name="storeDescription"
                    rows={3}
                    value={storeData.storeDescription}
                    onChange={handleStoreChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">Store Status</p>
                    <p className="text-sm text-gray-500">Open or close your store to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="storeStatus"
                      className="sr-only peer"
                      checked={storeData.storeStatus}
                      onChange={handleStoreChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Opening Time</label>
                    <input
                      type="time"
                      name="openingTime"
                      value={storeData.openingTime}
                      onChange={handleStoreChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Closing Time</label>
                    <input
                      type="time"
                      name="closingTime"
                      value={storeData.closingTime}
                      onChange={handleStoreChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-screen p-6 max-w-10xl mx-auto bg-[#f3f8e9] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Settings</h1>
        <p className="text-gray-700 mt-1">Configure your store settings and preferences</p>
      </div>

      <div className="bg-[#e3f5d4] rounded-xl shadow-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="bg-[#a4d57c] text-black px-6 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
