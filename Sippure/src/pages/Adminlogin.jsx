import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, User, Lock, Eye, EyeOff } from 'lucide-react';



export default function SippureAdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole === 'admin') {
      navigate('/admindashboard');
    }
  }, [navigate]);

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const loginResponse = await api.post('/auth/admin/login', {
        email: formData.email,
        password: formData.password
      });

      if (loginResponse.data?.data?.access_token) {
        const token = loginResponse.data.data.access_token;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', 'admin');
        api.defaults.headers.common['Authorization'] = token;
        navigate('/admindashboard');
      } else {
        setError('Invalid login response - No token received');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#e3f5d4' }}>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-8 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-full" style={{ backgroundColor: '#a4d57c' }}>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d57c] focus:border-transparent transition-all duration-200 bg-white bg-opacity-90"
                placeholder="admin@sippure.com"
              />
            </div>
          </div>

          
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
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
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-[#a4d57c] focus:ring-[#a4d57c]"
              />
              <span className="ml-2 text-gray-600 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-[#a4d57c] hover:text-green-700 text-sm font-medium transition-colors">
              Forgot Password?
            </a>
          </div>

          
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#a4d57c' }}
          >
            Login to Admin Panel
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">Sippure Admin Portal © 2024</p>
        </div>
      </div>
    </div>
  );
}
