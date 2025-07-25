import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    // Check login status whenever component renders or localStorage changes
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);
    };

    // Add event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Check initial status
    checkLoginStatus();

    // Add custom event listener for login/logout
    window.addEventListener('authStateChange', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authStateChange', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowUserMenu((prev) => !prev); // Just toggle the menu if logged in
    } else {
      navigate('/signin'); // Use navigate instead of window.location for better routing
    }
  };

  const handleAccountProfile = () => {
    setShowUserMenu(false);
    navigate('/myprofile');
  };

  const handleAccountSettings = () => {
    setShowUserMenu(false);
    navigate('/accountsetting');
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint to invalidate token
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth data
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("rememberedEmail");
      
      // Reset state
      setIsLoggedIn(false);
      setShowUserMenu(false);
      
      // Clear Authorization header
      delete api.defaults.headers.common['Authorization'];
      
      // Dispatch event to notify navbar of logout
      window.dispatchEvent(new Event('authStateChange'));
      
      // Redirect to home
      navigate('/');
    }
  };

  return (
    <nav className="w-full bg-[#8ec06c] px-[5%] py-4 sticky top-0 z-[1000] shadow-md flex items-center justify-between">
      <div className="Logo">
        <Link to="/">
          <img src="Images/Sippurelogo.png" alt="Sippure Logo" className="h-[50px]" />
        </Link>
      </div>

      <ul className="flex list-none gap-8">
        <li>
          <Link to="/" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            About
          </Link>
        </li>
        <li>
          <Link to="/products" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Products
          </Link>
        </li>
        <li>
          
        </li>
        <li>
          <Link to="/gallery" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex gap-6 items-center relative text-[#333] text-3xl">
        <div
          className="flex items-center cursor-pointer hover:text-white transition-colors"
          onClick={handleUserIconClick}
        >
          <FiUser />
        </div>

        {showUserMenu && isLoggedIn && (
          <div
            ref={userMenuRef}
            className="absolute top-full right-0 mt-2 w-48 bg-[#8ec06c] rounded-md shadow-lg py-1 z-50"
          >
            <button
              onClick={handleAccountProfile}
              className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-green-700"
            >
              Account
            </button>
            <button
              onClick={handleAccountSettings}
              className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-green-700"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-green-700"
            >
              Logout
            </button>
          </div>
        )}

        <Link
          to="/cart"
          className="flex items-center cursor-pointer hover:text-white transition-colors"
          aria-label="Cart"
        >
          <FiShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
