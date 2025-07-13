import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#a5cc93] text-[#1f1f1f] py-10 mt-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

         
          <div>
            <h2 className="text-2xl font-bold mb-4">Sippure</h2>
            <p className="text-sm leading-relaxed">
              Naturally Refreshing, Mindfully Made. Sip wellness in every cup with Sippure’s herbal teas.
            </p>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <ul className="text-sm space-y-3">
              <li className="flex items-center gap-2">
                <FaPhoneAlt aria-hidden="true" /> 
                <a href="tel:+9779804328885" className="hover:underline">+977 9804328885</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope aria-hidden="true" /> 
                <a href="mailto:support@sippuretea.com" className="hover:underline">support@sippuretea.com</a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex gap-6 mt-6 text-2xl">
              <a 
                href="#" 
                aria-label="Facebook" 
                className="hover:text-white transition-colors duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a 
                href="#" 
                aria-label="Instagram" 
                className="hover:text-white transition-colors duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a 
                href="#" 
                aria-label="Twitter" 
                className="hover:text-white transition-colors duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

        </div>
        <div className="text-center text-sm text-[#333] mt-10">
          © {new Date().getFullYear()} Sippure Tea Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
