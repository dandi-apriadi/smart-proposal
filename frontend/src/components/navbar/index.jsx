import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";

const Navbar = ({ onOpenSidenav, brandText: initialBrandText }) => {
  // State untuk teks merek
  const [brandText, setBrandText] = useState(initialBrandText);

  // Mendapatkan data dari Redux store
  const { microPage, user } = useSelector((state) => state.auth);

  // Memperbarui brandText saat microPage berubah
  useEffect(() => {
    setBrandText(microPage !== "unset" ? microPage : initialBrandText);
  }, [microPage, initialBrandText]);

  // Function to handle logout
  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    // Redirect to login page or dispatch logout action
  };

  return (
    <nav className="sticky top-4 z-40 flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur-xl shadow-sm dark:bg-[#0b14374d]">
      {/* Left side - Branding */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1 text-sm text-navy-700 dark:text-white">
          <span>{user ? user.name : 'User'}</span>
          <span>/</span>
          <Link
            to="#"
            className="font-medium capitalize hover:underline"
          >
            {brandText}
          </Link>
        </div>
        <h1 className="mt-1 text-2xl font-bold capitalize text-navy-700 dark:text-white">
          {brandText}
        </h1>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-3">
        {/* Mobile menu toggle */}
        <button
          className="flex lg:hidden items-center justify-center h-10 w-10 rounded-full bg-white/90 text-gray-700 hover:bg-gray-100 transition-colors shadow-sm dark:bg-navy-800 dark:text-white"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center px-4 py-2 rounded-full bg-white/90 text-red-500 hover:bg-red-50 transition-colors shadow-sm dark:bg-navy-800 dark:hover:bg-navy-700"
        >
          <RiLogoutBoxLine className="h-5 w-5" />
          <span className="ml-2 font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
