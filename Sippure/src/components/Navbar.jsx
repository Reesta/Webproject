import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
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
    console.log("User icon clicked, showUserMenu before toggle:", showUserMenu);
    if (isLoggedIn) {
      setShowUserMenu(true);
    } else {
      window.location.href = "/signin";
    }
  };

  const handleAccountProfile = () => {
    setShowUserMenu(false);
    window.location.href = "/accountProfile";
  };

  const handleAccountSettings = () => {
    setShowUserMenu(false);
    window.location.href = "/account-settings";
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setShowUserMenu(false);
    window.location.href = "/";
    window.location.reload();
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
          <HashLink smooth to="/#Home" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Home
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/about" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            About
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/products" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Products
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/menu" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Menu
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/gallery" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Gallery
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/contact" className="text-[#333] font-semibold text-lg hover:text-white transition-colors duration-300">
            Contact
          </HashLink>
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
