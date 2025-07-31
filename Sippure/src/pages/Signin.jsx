import React, { useState, useEffect } from 'react';
import {
  FaEye,
  FaLock
} from "react-icons/fa";
import {
  IoEyeOff
} from "react-icons/io5";
import {
  MdAttachEmail
} from "react-icons/md";
import {
  Link,
  useNavigate
} from "react-router-dom";
import api from "../api/axios";

const SignInPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: localStorage.getItem('rememberedEmail') || "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data?.data?.access_token) {
        const { access_token, user } = response.data.data;
        
        // Store auth data
        localStorage.setItem('token', access_token);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Set token for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // If remember me is checked, store email (never store password)
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        }

        // Dispatch event to notify navbar of login
        window.dispatchEvent(new Event('authStateChange'));

        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admindashboard');
        } else {
          navigate('/');
        }
      } else {
        setErrors({ submit: 'Invalid login response' });
      }
    } catch (error) {
      console.error('Login failed:', error);
      
      let errorMessage = 'Failed to login';
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="min-h-screen bg-[#f3f8e9] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#8DA57B] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <FaLock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, friend!</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <div className="bg-[#e3f5d4] rounded-2xl shadow-xl p-8 border border-gray-100">
          {errors.submit && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {errors.submit}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdAttachEmail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    placeholder="Enter your email"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <IoEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me / Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={(e) => 
                      setFormData(prev => ({
                        ...prev,
                        rememberMe: e.target.checked
                      }))
                    }
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
              {/* Removed Forgot password button as per request */}
              {/* <button
                type="button"
                onClick={() =>
                  alert("Forgot password functionality not implemented yet.")
                }
                className="text-sm text-blue-300 hover:text-blue-400 font-medium"
              >
                Forgot password?
              </button> */}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  backgroundColor: "#a4d57c"
                }}
                className="w-full text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-300 hover:text-blue-400"
            >
              Sign up for free
            </Link>
          </p>

          {/* Admin Login Button */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <button
              type="button"
              onClick={() => navigate("/adminlogin")}
              className="text-sm font-medium text-[#8DA57B] hover:text-[#748f63] flex items-center justify-center space-x-1 mx-auto"
            >
              <FaLock className="h-4 w-4" />
              <span>Login as Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;