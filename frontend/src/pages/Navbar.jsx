import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg fixed w-full z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo / Title */}
          <div className="text-white text-2xl font-bold tracking-wide">
            Student Portal
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/home"
              className="text-white text-lg font-medium px-3 py-1 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Admin Panel
            </Link>
            <Link
              to="/"
              className="text-white text-lg font-medium px-3 py-1 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Add Content
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <HiX size={28} className="text-white" />
              ) : (
                <HiMenu size={28} className="text-white" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-indigo-600 bg-opacity-95 backdrop-blur-md px-6 py-4 space-y-4 transition-all duration-300 ${
            isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <Link
            to="/home"
            onClick={toggleMenu}
            className="block text-white text-lg font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Admin Panel
          </Link>
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-white text-lg font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Add Content
          </Link>
        </div>
      </header>

      {/* Spacer div to prevent content overlap */}
      <div className="h-20 md:h-10" />
    </>
  );
};

export default Navbar;
