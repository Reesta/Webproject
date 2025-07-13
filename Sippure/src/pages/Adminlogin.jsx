import React, { useState } from 'react';
import { Eye, EyeOff, Leaf, Lock, User } from 'lucide-react';

const SippureAdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = () => {
    setLoading(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      if (
        formData.username === DEMO_CREDENTIALS.username &&
        formData.password === DEMO_CREDENTIALS.password
      ) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          alert('Login successful! In production, you would be redirected.');
        }, 1500);
      } else {
        setError('Invalid username or password.');
        setFormData(prev => ({ ...prev, password: '' }));
      }
      setLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here.');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#e3f5d4' }}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: '#a4d57c' }}
            >
              <Leaf className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sippure</h1>
          <p className="text-gray-600">Admin Portal</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d57c] focus:border-transparent transition-all duration-200 bg-white bg-opacity-90"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d57c] focus:border-transparent transition-all duration-200 bg-white bg-opacity-90"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-[#a4d57c] focus:ring-[#a4d57c]"
              />
              <span className="ml-2 text-gray-600 text-sm">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#a4d57c] hover:text-green-700 text-sm font-medium transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading ? 'cursor-not-allowed' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: loading ? '#ccc' : '#a4d57c'
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Authenticating...
              </div>
            ) : (
              'Login to Admin Panel'
            )}
          </button>
        </div>

        {loading && (
          <div className="text-center mt-4 text-gray-600 text-sm flex items-center justify-center">
            Brewing your session...
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            Sippure Admin Portal © 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default SippureAdminLogin;
