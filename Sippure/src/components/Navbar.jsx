import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#8ec06c] px-[5%] py-4 sticky top-0 z-[1000] shadow-md">
      
     
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
 
      <div className="flex gap-10 text-3xl text-[#333]">
        <Link to="/signin" aria-label="Sign In">👤</Link>
        
        <Link to="/cart" aria-label="Cart">🛒</Link>
      </div>
    </nav>
  );
};

export default Navbar;
